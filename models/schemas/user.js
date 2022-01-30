import Joi from "joi";

let user_name = Joi.string()
let password = Joi.string()

export const UserSchema = {
    user_name: user_name.required(),
    password: password.required()
}
