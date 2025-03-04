import Joi from "joi";

export const UserModel = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(80).required(),
});
