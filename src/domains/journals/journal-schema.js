import Joi from "joi";

const journalSchema = Joi.object({
    journal_id : Joi.number().min(1).required()
        .messages({
            "number.empty": "Id journal is required",
            "number.min": "Id journal must be at least 1 character",
            "number.base": "Id journal must be int"
    })
})

const createJournalSchema = Joi.object({
    title: Joi.string().min(4).required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 1 character",
            "string.base": "Title must be string"
    }),
    content: Joi.string().min(4).required()
        .messages({
            "string.empty": "Content is required",
            "string.min": "Content must be at least 1 character",
            "string.base": "Content must be string"
    }),
})

const updateJournalSchema = Joi.object({
    title: Joi.string().min(4).optional()
        .messages({
            "string.min": "Title must be at least 1 character",
            "string.base": "Title must be string"
    }),
    content: Joi.string().min(4).optional()
        .messages({
            "string.min": "Content must be at least 1 character",
            "string.base": "Content must be string"
    }),
})

const getJournalSchema = Joi.object({
    page: Joi.number().min(1).optional()
        .messages({
            "number.min": "Page must be at least 1",
            "number.base": "Page must be number"
    }),
    limit: Joi.number().min(1).optional()
        .messages({
            "number.min": "Limit must be at least 1",
            "number.base": "Limit must be number"
    }),
    timeframe: Joi.string().valid("week", "month").optional()
        .messages({
            "string.base": "Timeframe must be string",
            "any.only": "Timeframe must be one of day, week, month, year"
    }),
});

const getJournalStatsSchema = Joi.object({
    timeframe: Joi.string().valid("week", "month", "year").optional()
        .messages({
            "string.base": "Timeframe must be string",
            "any.only": "Timeframe must be one of week or month or year"
    }),
});

export {journalSchema, createJournalSchema, updateJournalSchema, getJournalSchema, getJournalStatsSchema};