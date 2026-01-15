import BaseError from "../../base_classes/base-error.js";

import prisma from "../../config/db.js";
import {
  groq,
  GROQ_DEFAULT_MODEL,
  GROQ_DEFAULT_SETTINGS,
} from "../../config/groqAi.js";
import { ConvertBirthDay } from "../../utils/ageConvert.js";
import {
  addDays,
  dateKeyLocal,
  endOfDayLocal,
  monthKeyLocal,
  startOfDayLocal,
} from "../../utils/dateParser.js";
import quotesService from "../quotes/quotes-service.js";

class JournalService {
  async pickDominantMood(moodCounts) {
    let dominantMood = null;
    let dominantCount = 0;

    for (const [mood, count] of Object.entries(moodCounts)) {
      if (count > dominantCount) {
        dominantMood = mood;
        dominantCount = count;
      }
    }
    console.log(dominantCount, dominantMood);
    
    return { dominantMood, dominantCount };
  }

  async create(data) {
    data.mood = await this.generateMood(data.content);
    const user = await prisma.user.findFirst({
      where: {
        user_id: data.userId,
      },
    });
    if(data.quote){
      await prisma.quote.create({
        data: {
          text: data.quote,
          category: data.mood,
          author: user ? user.fullName : "Unknown",
        }
      })
    }
    console.log(data);
    
    const journal = await prisma.journal.create({
      data: {
        title: data.title,
        content: data.content,
        mood: data.mood,
        userId: data.userId,
      },
    });


    if (!journal) {
      throw Error("Failed to create journla");
    }

    const quote = await quotesService.recomendation({
      userId: journal.userId,
      category: journal.mood,
    });

    const popularQuotes = await quotesService.getById(quote[0].quote_id);

    const createQuoteLog = await quotesService.quoteLog({
      userId: journal.userId,
      quoteId: popularQuotes,
      action: "journal_assigned",
    });

    if (!createQuoteLog) {
      throw Error("Failed to create quote log for journal recomendation");
    }
    return {
      data: journal,
      quote: popularQuotes,
    };
  }

  async getAll(userId, timeframe, { offset, limit }) {
    let where = {};

    if (timeframe === "week") {
      const now = new Date();
      const dateFrom = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );
      where.createdAt = {
        gte: dateFrom,
      };
    }
    if (timeframe === "month") {
      const now = new Date();
      const dateFrom = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      where.createdAt = {
        gte: dateFrom,
      };
    }

    const journal = await prisma.journal.findMany({
      skip: offset ? Number(offset) : undefined,
      take: limit ? Number(limit) : undefined,
      where: {
        userId: userId,
        ...where,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return journal;
  }

  async getById(userId, id) {
    const journal = await prisma.journal.findFirst({
      where: {
        userId: userId,
        journal_id: id,
      },
    });
    if (!journal) throw BaseError.notFound("Journal not found");

    return journal;
  }

  async update(data, journal_id) {
    // title, content (can empty)

    const checkJournal = await prisma.journal.findFirst({
      where: {
        journal_id: journal_id,
      },
    });

    if (!checkJournal) throw BaseError.notFound("jornal not found");

    if (data.content) {
      data.mood = await this.generateMood(data.content);
    } else {
      data.mood = checkJournal.mood;
    }
    const journal = await prisma.journal.update({
      where: {
        journal_id: checkJournal.journal_id,
      },
      data: data,
    });

    return journal;
  }

  async delete(journal_id, userId) {
    const journal = await prisma.journal.findFirst({
      where: {
        journal_id,
        userId,
      },
    });

    if (!journal) {
      throw BaseError.notFound("Journal not found");
    }

    await prisma.journal.delete({
      where: {
        journal_id,
      },
    });

    return {
      message: "Successfully deleted journal",
    };
  }

  async generateMood(content) {
    const prompt = `
            You are an emotion classification agent.

            Task:
            - Read the following text (called "content").
            - Decide the SINGLE dominant emotional mood expressed in the content.
            - Reply with EXACTLY ONE of the following labels, in UPPERCASE, with no other text:

            ADMIRATION
            AMUSEMENT
            ANGER
            ANNOYANCE
            APPROVAL
            CARING
            CONFUSION
            CURIOSITY
            DESIRE
            DISAPPOINTMENT
            DISAPPROVAL
            DISGUST
            EMBARRASSMENT
            EXCITEMENT
            FEAR
            GRATITUDE
            GRIEF
            JOY
            LOVE
            NERVOUSNESS
            OPTIMISM
            PRIDE
            REALIZATION
            RELIEF
            REMORSE
            SADNESS
            SURPRISE
            NEUTRAL

            Guidelines:
            - The content can be in any language.
            - If multiple emotions appear, choose the SINGLE most dominant one based on the main theme.
            - The spelling MUST match EXACTLY as written (for example: CURIOSITY, **NOT** CURIOUSITY).
            - If the text is mostly factual or has no clear emotion, choose NEUTRAL.
            - Distinguish:
            - ANGER = strong, intense anger; ANNOYANCE = mild irritation.
            - SADNESS = general feeling down; GRIEF = deep sorrow from major loss.
            - FEAR = threat/danger; NERVOUSNESS = tension before an event.
            - For sarcasm, use the implied real emotion (e.g. “great, it broke again” → ANNOYANCE or DISAPPOINTMENT).

            Now classify this:
            content: """${content}"""
        `;

    const response = await groq.chat.completions.create({
      model: GROQ_DEFAULT_MODEL,
      messages: [{ role: "user", content: prompt }],
      ...GROQ_DEFAULT_SETTINGS,
    });
    return (
      response.choices[0]?.message?.content?.trim() ||
      "Maaf, aku tidak bisa memberikan respons."
    );
  }

  async getStatistics(userId, timeframe) {
    const now = new Date();
    const todayStart = startOfDayLocal(now);
    const todayEnd = endOfDayLocal(now);

    let dateFrom;
    if (timeframe === "week") {
      dateFrom = addDays(todayStart, -6);
    } else if (timeframe === "month") {
      dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFrom = startOfDayLocal(dateFrom);
    } else if (timeframe === "year") {
      dateFrom = new Date(now.getFullYear(), 0, 1);
      dateFrom = startOfDayLocal(dateFrom);
    } else {
      throw new Error("Invalid timeframe");
    }

    const journals = await prisma.journal.findMany({
      where: {
        userId,
        createdAt: { gte: dateFrom, lte: todayEnd },
      },
      select: { createdAt: true },
    });

    if (timeframe === "week") {
      const countByDate = {};
      for (const j of journals) {
        const key = dateKeyLocal(j.createdAt);
        countByDate[key] = (countByDate[key] || 0) + 1;
      }

      const stats = [];
      for (
        let d = new Date(dateFrom);
        d <= todayStart;
        d.setDate(d.getDate() + 1)
      ) {
        const key = dateKeyLocal(d);
        stats.push({ date: key, totalJournals: countByDate[key] || 0 });
      }
      return stats;
    }

    if (timeframe === "month") {
      const bucketSize = 7;
      const base = startOfDayLocal(dateFrom);

      const bucketCounts = {}; // idx -> total
      for (const j of journals) {
        const jd = startOfDayLocal(j.createdAt);
        const diffDays = Math.floor((jd - base) / 86400000);
        const idx = Math.floor(diffDays / bucketSize);
        bucketCounts[idx] = (bucketCounts[idx] || 0) + 1;
      }

      const totalDays = Math.floor((todayStart - base) / 86400000);
      const totalBuckets = Math.floor(totalDays / bucketSize);

      const stats = [];
      for (let idx = 0; idx <= totalBuckets; idx++) {
        const start = addDays(base, idx * bucketSize);
        const end = addDays(base, idx * bucketSize + (bucketSize - 1));
        const endCapped = end > todayStart ? todayStart : end;

        stats.push({
          startDate: dateKeyLocal(start),
          endDate: dateKeyLocal(endCapped),
          totalJournals: bucketCounts[idx] || 0,
        });
      }

      return stats;
    }

    if (timeframe === "year") {
      const countByMonth = {};
      for (const j of journals) {
        const key = monthKeyLocal(j.createdAt);
        countByMonth[key] = (countByMonth[key] || 0) + 1;
      }

      const y = now.getFullYear();
      const stats = [];
      for (let m = 0; m < 12; m++) {
        const monthDate = new Date(y, m, 1);
        const key = monthKeyLocal(monthDate);
        stats.push({
          month: key,
          totalJournals: countByMonth[key] || 0,
        });
      }

      return stats;
    }
  }

  async getMoodByTimeframe(userId, timeframe) {
    const now = new Date();
    const todayStart = startOfDayLocal(now);
    const todayEnd = endOfDayLocal(now);

    let dateFrom;
    if (timeframe === "week") {
      dateFrom = addDays(todayStart, -6);
    } else if (timeframe === "month") {
      dateFrom = startOfDayLocal(
        new Date(now.getFullYear(), now.getMonth(), 1)
      );
    } else if (timeframe === "year") {
      dateFrom = startOfDayLocal(new Date(now.getFullYear(), 0, 1));
    } else {
      throw new Error("Invalid timeframe");
    }

    const journals = await prisma.journal.findMany({
      where: {
        userId,
        createdAt: { gte: dateFrom, lte: todayEnd },
      },
      select: { createdAt: true, mood: true },
    });

    // ===== WEEK: per hari =====
    if (timeframe === "week") {
      const byDate = {}; // key -> { total, moodCounts }

      for (const j of journals) {
        const key = dateKeyLocal(j.createdAt);
        if (!byDate[key]) byDate[key] = { total: 0, moodCounts: {} };

        byDate[key].total += 1;
        const mood = j.mood ?? "UNKNOWN";
        byDate[key].moodCounts[mood] = (byDate[key].moodCounts[mood] || 0) + 1;
      }

      const result = [];
      for (
        let d = new Date(dateFrom);
        d <= todayStart;
        d.setDate(d.getDate() + 1)
      ) {
        const key = dateKeyLocal(d);
        const row = byDate[key] || { total: 0, moodCounts: {} };
        const { dominantMood, dominantCount } = await this.pickDominantMood(row.moodCounts);

        result.push({
          date: key,
          totalMoods: row.total, 
          dominantMood,
          dominantCount,
        });
      }

      return result;
    }

    if (timeframe === "month") {
      const bucketSize = 7;
      const base = startOfDayLocal(dateFrom);

      const buckets = {};
      for (const j of journals) {
        const jd = startOfDayLocal(j.createdAt);
        const diffDays = Math.floor((jd - base) / 86400000);
        const idx = Math.floor(diffDays / bucketSize);

        if (!buckets[idx]) buckets[idx] = { total: 0, moodCounts: {} };

        buckets[idx].total += 1;
        const mood = j.mood ?? "UNKNOWN";
        buckets[idx].moodCounts[mood] =
          (buckets[idx].moodCounts[mood] || 0) + 1;
      }

      const totalDays = Math.floor((todayStart - base) / 86400000);
      const totalBuckets = Math.floor(totalDays / bucketSize);

      const result = [];
      for (let idx = 0; idx <= totalBuckets; idx++) {
        const start = addDays(base, idx * bucketSize);
        const end = addDays(base, idx * bucketSize + (bucketSize - 1));
        const endCapped = end > todayStart ? todayStart : end;

        const row = buckets[idx] || { total: 0, moodCounts: {} };
        const { dominantMood, dominantCount } = await this.pickDominantMood(row.moodCounts);

        result.push({
          startDate: dateKeyLocal(start),
          endDate: dateKeyLocal(endCapped),
          totalMoods: row.total,
          dominantMood,
          dominantCount,
        });
      }      

      return result;
    }

    if (timeframe === "year") {
      const byMonth = {};

      for (const j of journals) {
        const key = monthKeyLocal(j.createdAt);
        if (!byMonth[key]) byMonth[key] = { total: 0, moodCounts: {} };

        byMonth[key].total += 1;
        const mood = j.mood ?? "UNKNOWN";
        byMonth[key].moodCounts[mood] =
          (byMonth[key].moodCounts[mood] || 0) + 1;
      }

      const y = now.getFullYear();
      const result = [];

      for (let m = 0; m < 12; m++) {
        const monthDate = new Date(y, m, 1);
        const key = monthKeyLocal(monthDate);

        const row = byMonth[key] || { total: 0, moodCounts: {} };
        const { dominantMood, dominantCount } = await this.pickDominantMood(row.moodCounts);

        result.push({
          month: key,
          totalMoods: row.total,
          dominantMood,
          dominantCount,
        });
      }

      return result;
    }
  }

  // get all data journal for csv admin timeframe (week, months, year)
  async getAllDataJournal(timeframe) {
    const now = new Date();
    let dateFrom;

    if (timeframe === "week") {
      dateFrom = new Date(now);
      dateFrom.setDate(now.getDate() - 6);
    } else if (timeframe === "month") {
      dateFrom = new Date(now);
      dateFrom.setMonth(now.getMonth() - 1);
    } else if (timeframe === "year") {
      dateFrom = new Date(now.getFullYear(), 0, 1);
    }

    const journalTimeFilter = dateFrom
      ? {
          createdAt: {
            gte: dateFrom,
            lte: now,
          },
        }
      : {};

    const users = await prisma.user.findMany({
      where: {
        journals: {
          some: journalTimeFilter,
        },
      },
      select: {
        email: true,
        gender: true,
        birthDate: true,
        journals: {
          where: journalTimeFilter,
          select: {
            title: true,
            mood: true,
          },
        },
      },
    });

    return users.map((u) => ({
      email: u.email,
      gender: u.gender,
      umur: ConvertBirthDay(u.birthDate),
      totalJournals: u.journals.length,
      journals: u.journals,
    }));
  }
}

export default new JournalService();
