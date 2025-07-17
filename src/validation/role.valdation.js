import Joi from "joi";
import { isValidMongoId } from "../middleware/input-validate.middleware.js";

export const createRoleSchema = Joi.object({
    rolename: Joi.string().required(),
    accessmodules: Joi.array().items(Joi.string()).unique().required(),
    active: Joi.boolean()
});

export const updateRoleSchema = Joi.object({
    rolename: Joi.string().required(),
    accessmodules: Joi.array().items(Joi.string()).unique(),
    active: Joi.boolean()
});
