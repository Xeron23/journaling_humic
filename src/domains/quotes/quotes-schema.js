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
    category: Joi.string().optional().valid("HAPPY", "SAD", "NEUTRAL", "ANGRY", "MOTIVATED")
        .messages({
            "string.base": "action must be string",
            "any.only": `Category must be "HAPPY", "SAD", "NEUTRAL", "ANGRY", "MOTIVATED"`
        }),
    search_query: Joi.string().optional()
        .messages({
            "string.base": "aseach query must be string",
        })
});

const quoteRecomendation = Joi.object({
    category: Joi.string().required().valid("HAPPY", "SAD", "NEUTRAL", "ANGRY", "MOTIVATED")
        .messages({
            "string.base": "action must be string",
            "any.only": `Category must be "HAPPY", "SAD", "NEUTRAL", "ANGRY", "MOTIVATED"`
    })
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