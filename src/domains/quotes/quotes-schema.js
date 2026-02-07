import Joi from "joi";

const createQuoteLogSchema = Joi.object({
    action: Joi.string().valid('click', 'like').optional().
        messages({
            "string.base": "action must be string",
            "any.only": `Action must be "click"or "like"`
        }),
    quoteId: Joi.number().min(1).required()
        .messages({
            "number.empty": "Id quote is required",
            "number.min": "Id quote must be at least 1 character",
            "number.base": "Id quote must be int"
    })
});

const quoteGetAll = Joi.object({
    page: Joi.number().min(1).optional()
        .messages({
            "number.min": "Page must be at least 1."
        }),
    limit: Joi.number().min(1).max(100).optional()
        .messages({
            "number.min": "Limit must be at least 1.",
            "number.max": "Limit must be at most 100."
    }),
    category: Joi.string()
    .optional()
    .valid(
        "ADMIRATION",
        "AMUSEMENT",
        "ANGER",
        "ANNOYANCE",
        "APPROVAL",
        "CARING",
        "CONFUSION",
        "CURIOSITY",
        "DESIRE",
        "DISAPPOINTMENT",
        "DISAPPROVAL",
        "DISGUST",
        "EMBARRASSMENT",
        "EXCITEMENT",
        "FEAR",
        "GRATITUDE",
        "GRIEF",
        "JOY",
        "LOVE",
        "NERVOUSNESS",
        "OPTIMISM",
        "PRIDE",
        "REALIZATION",
        "RELIEF",
        "REMORSE",
        "SADNESS",
        "SURPRISE",
        "NEUTRAL"
    )
    .messages({
        "string.base": "category must be string",
        "any.only":
        'Category must be one of: "ADMIRATION", "AMUSEMENT", "ANGER", "ANNOYANCE", "APPROVAL", "CARING", "CONFUSION", "CURIOSITY", "DESIRE", "DISAPPOINTMENT", "DISAPPROVAL", "DISGUST", "EMBARRASSMENT", "EXCITEMENT", "FEAR", "GRATITUDE", "GRIEF", "JOY", "LOVE", "NERVOUSNESS", "OPTIMISM", "PRIDE", "REALIZATION", "RELIEF", "REMORSE", "SADNESS", "SURPRISE", "NEUTRAL"',
    }),
    search_query: Joi.string().optional()
        .messages({
            "string.base": "search query must be string",
    })
});

const quoteRecomendation = Joi.object({
    category: Joi.string()
    .required()
    .valid(
        "ADMIRATION",
        "AMUSEMENT",
        "ANGER",
        "ANNOYANCE",
        "APPROVAL",
        "CARING",
        "CONFUSION",
        "CURIOSITY",
        "DESIRE",
        "DISAPPOINTMENT",
        "DISAPPROVAL",
        "DISGUST",
        "EMBARRASSMENT",
        "EXCITEMENT",
        "FEAR",
        "GRATITUDE",
        "GRIEF",
        "JOY",
        "LOVE",
        "NERVOUSNESS",
        "OPTIMISM",
        "PRIDE",
        "REALIZATION",
        "RELIEF",
        "REMORSE",
        "SADNESS",
        "SURPRISE",
        "NEUTRAL"
    )
    .messages({
        "string.base": "category must be string",
        "any.only":
        'Category must be one of: "ADMIRATION", "AMUSEMENT", "ANGER", "ANNOYANCE", "APPROVAL", "CARING", "CONFUSION", "CURIOSITY", "DESIRE", "DISAPPOINTMENT", "DISAPPROVAL", "DISGUST", "EMBARRASSMENT", "EXCITEMENT", "FEAR", "GRATITUDE", "GRIEF", "JOY", "LOVE", "NERVOUSNESS", "OPTIMISM", "PRIDE", "REALIZATION", "RELIEF", "REMORSE", "SADNESS", "SURPRISE", "NEUTRAL"',
    }),
});

const quoteSchema = Joi.object({
    quoteId: Joi.number().min(1).required()
        .messages({
            "number.empty": "Id quote is required",
            "number.min": "Id quote must be at least 1 character",
            "number.base": "Id quote must be int"
    })
});

export { createQuoteLogSchema, quoteGetAll, quoteSchema, quoteRecomendation}