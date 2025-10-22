import BaseError from "../../base_classes/base-error.js";

import prisma from "../../config/db.js";

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
        return journal;
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
        const moods = ["HAPPY", "SAD", "NEUTRAL", "ANGRY", "MOTIVATED"];
        const randomIndex = Math.floor(Math.random() * moods.length);
        return moods[randomIndex];
    }
}

export default new JournalService();