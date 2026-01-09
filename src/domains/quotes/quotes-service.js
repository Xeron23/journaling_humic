
import prisma from "../../config/db.js";
import BaseError from "../../base_classes/base-error.js";

class QuoteService {
    // create quote_logs (just click)
    // data -> userId, quoteId, click
    async quoteLog({userId, quoteId, action}){
        const checkQuote = await prisma.quote.findFirst({
            where: {
                quote_id: quoteId
            }
        });

        if(!checkQuote){
            throw BaseError.notFound("Quote not found");
        }

        const quoteLog = await prisma.quoteLog.upsert({
            where: {
                userId_quoteId_action: {
                    userId,
                    quoteId,
                    action,
                },
            },
            update: {
                count: { increment: 1 },
            },
            create: {
                userId,
                quoteId,
                action,
             },
        });
        return quoteLog;
    }

    

    // get quotes all with page and limit
    async getAllQuote({offset, limit, category}){
        let where = {};
        if(category){
            where.category = category;
        }
        const quotes = await prisma.quote.findMany({
            skip: offset?Number(offset): undefined,
            take: limit ? Number(limit): undefined,
            where,
            orderBy: {
                createdAt: 'asc'
            }
        })
        return quotes;
    }   

    // get quotes by id
    async getById(id){
        const quote = await prisma.quote.findFirst({
            where: {
                quote_id: id
            }
        });
        if(!quote){
            throw BaseError.notFound("Data quote not found");
        }
        return quote;
    }

    // get quotes by search
    async search({offset, limit, search_query}){
        const quote = await prisma.quote.findMany({
            skip: offset?Number(offset): undefined,
            take: limit ? Number(limit): undefined,
            where: {
                OR: [
                    {text: {contains: search_query}},
                    {author: {contains: search_query}},
                ]
            }
        });
        if(!quote){
            throw BaseError.notFound("Data quote is not found");
        }
        return quote;
    }

    // get by recomendation
    async recomendation({ userId, category }) {
    const clickedQuotes = await prisma.quoteLog.findMany({
        where: {
            userId,
            OR: [
                {action: 'click'},
                {action: 'journal_assigned'},
            ],
            // action: 'click',
            quote: { category: category },
        },
        select: {
            quoteId: true,
            count: true,
        },
    });

    console.log(clickedQuotes);
    
    const clickedQuoteIds = clickedQuotes.map(q => q.quoteId);

    console.log(clickedQuoteIds);
    

    const quotes = await prisma.quote.findMany({
        where: {
        category,
        quote_id: { notIn: clickedQuoteIds.length ? clickedQuoteIds : [0] }, // hindari quote yang sering diklik
        },
        orderBy: {
        createdAt: 'desc',
        },
        take: 5, // ambil 5 rekomendasi
    });

    // 4️⃣ Kalau data terlalu sedikit, tambahkan beberapa quote yang sudah diklik tapi jarang
    if (quotes.length < 5 && clickedQuotes.length > 0) {
        const rareClicks = clickedQuotes
        .filter(q => q.count < 3) // misalnya hanya yang diklik < 3x
        .map(q => q.quoteId);

        const backupQuotes = await prisma.quote.findMany({
        where: {
            category,
            quote_id: { in: rareClicks },
        },
        take: 5 - quotes.length,
        });

        quotes.push(...backupQuotes);
    }

    return quotes;
    }
}

export default new QuoteService();