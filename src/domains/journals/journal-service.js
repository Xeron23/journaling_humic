import BaseError from "../../base_classes/base-error.js";

import prisma from "../../config/db.js";
import geminiAi from "../../config/geminiAi.js";
import { groq, GROQ_DEFAULT_MODEL, GROQ_DEFAULT_SETTINGS } from "../../config/groqAi.js";
import quotesService from "../quotes/quotes-service.js";

class JournalService {
    // crud journal

    async create(data){
        data.mood = await this.generateMood(data.content);
        const journal = await prisma.journal.create({
            data: data,
        });
        if(!journal){
            throw Error("Failed to create journla")
        }

        const quote = await quotesService.recomendation({userId: journal.userId, category: journal.mood});

        const createQuoteLog = await quotesService.quoteLog({userId: journal.userId, quoteId: quote.quote_id, action: 'journal_assigned'});
        
        if(!createQuoteLog){
            throw Error("Failed to create quote log for journal recomendation");
        }
        return {
            data: journal,
            quote: quote
        }
    }

    async getAll(userId){
        const journal = await prisma.journal.findMany({
            where: {
                userId: userId
            }
        })
        return journal;
    }

    async getById(userId, id){
        const journal = await prisma.journal.findFirst({
            where: {
                userId: userId,
                journal_id: id
            }
        });
        if(!journal) throw BaseError.notFound("Journal not found");

        return journal;
    }

    async update(data, journal_id){
        // title, content (can empty)

        const checkJournal = await prisma.journal.findFirst({
            where: {
                journal_id: journal_id
            }
        })
        if(!checkJournal) throw BaseError.notFound("jornal not found");

        if(data.content){
            data.mood = await this.generateMood(data.content)
        }else {
            data.mood = checkJournal.mood;
        }
        const journal = await prisma.journal.update({
            where: {
                journal_id: checkJournal.journal_id
            },
            data: data
        });

        return journal;
    }

    async delete(journal_id, userId) {
    const journal = await prisma.journal.findFirst({
        where: {
        journal_id,
        userId
        }
    });

    if (!journal) {
        throw BaseError.notFound("Journal not found");
    }

    await prisma.journal.delete({
        where: {
        journal_id
        }
    });

    return {
        message: "Successfully deleted journal"
    };
    }

    async generateMood(content){
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
            - If the text is mostly factual or has no clear emotion, choose NEUTRAL.
            - Distinguish:
            - ANGER = strong, intense anger; ANNOYANCE = mild irritation.
            - SADNESS = general feeling down; GRIEF = deep sorrow from major loss.
            - FEAR = threat/danger; NERVOUSNESS = tension before an event.
            - For sarcasm, use the implied real emotion (e.g. “great, it broke again” → ANNOYANCE or DISAPPOINTMENT).

            Now classify this:
            content: """${content}"""
        `;

        // const response = await geminiAi.models.generateContent({
        //     model: "gemini-2.5-flash",
        //     contents: prompt,
        // });
        // return response.text;

        const response = await groq.chat.completions.create({
            model: GROQ_DEFAULT_MODEL,
            messages: [{ role: "user", content: prompt }],
            ...GROQ_DEFAULT_SETTINGS,
            });
        return response.choices[0]?.message?.content?.trim() || "Maaf, aku tidak bisa memberikan respons.";
    }

    // get all data journal for csv admin timeframe (week, months, year)
    
}




export default new JournalService();