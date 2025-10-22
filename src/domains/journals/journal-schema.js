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

export {journalSchema, createJournalSchema, updateJournalSchema};