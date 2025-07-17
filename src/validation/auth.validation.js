import Joi from "joi";

export const registerSchema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(3).required(),
    username: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$")) // At least 1 letter and 1 digit, min 6 chars
        .required()
        .messages({
            "string.pattern.base": "Password must contain at least one letter and one number",
        }),
    role: Joi.string().required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
