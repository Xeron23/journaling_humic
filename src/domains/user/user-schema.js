import Joi from "joi";

const userSchema = Joi.object({
  timeframe: Joi.string().valid("week", "month", "year").optional().messages({
    "string.base": "Timeframe must be string",
    "any.only": "Timeframe must be one of day, week, month, year",
  }),
});

export { userSchema };
