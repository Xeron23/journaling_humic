import BaseError from "../../base_classes/base-error.js";

import prisma from "../../config/db.js";
import {
  groq,
  GROQ_DEFAULT_MODEL,
  GROQ_DEFAULT_SETTINGS,
} from "../../config/groqAi.js";
import { ConvertBirthDay } from "../../utils/ageConvert.js";
import quotesService from "../quotes/quotes-service.js";

class JournalService {
  async create(data) {
    data.mood = await this.generateMood(data.content);
    const journal = await prisma.journal.create({
      data: data,
    });
    if (!journal) {
      throw Error("Failed to create journla");
    }

    const quote = await quotesService.recomendation({
      userId: journal.userId,
      category: journal.mood,
    });

    const createQuoteLog = await quotesService.quoteLog({
      userId: journal.userId,
      quoteId: quote.quote_id,
      action: "journal_assigned",
    });

    if (!createQuoteLog) {
      throw Error("Failed to create quote log for journal recomendation");
    }
    return {
      data: journal,
      quote: quote,
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
    let where = { userId: userId };
    const now = new Date();
    let dateFrom;

    if (timeframe === "week") {
      dateFrom = new Date(now);
      dateFrom.setDate(now.getDate() - 6);
    } else if (timeframe === "month") {
      dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (timeframe === "year") {
      dateFrom = new Date(now.getFullYear(), 0, 1);
    }

    // Kalau mau aman, bisa cek kalau timeframe nggak valid:
    if (!dateFrom) {
      throw new Error("Invalid timeframe");
    }

    const journals = await prisma.journal.findMany({
      where,
      select: {
        createdAt: true,
      },
    });

    const countByDate = {};
    for (const j of journals) {
      const key = j.createdAt.toISOString().slice(0, 10);
      countByDate[key] = (countByDate[key] || 0) + 1;
    }

    const stats = [];
    for (
      let d = new Date(
        dateFrom.getFullYear(),
        dateFrom.getMonth(),
        dateFrom.getDate()
      );
      d <= now;
      d.setDate(d.getDate() + 1)
    ) {
      const key = d.toISOString().slice(0, 10);

      stats.push({
        date: key,
        totalJournals: countByDate[key] || 0,
      });
    }
    console.log(stats.length);

    return stats;
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
