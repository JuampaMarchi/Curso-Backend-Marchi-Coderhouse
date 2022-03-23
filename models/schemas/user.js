const Joi = require('joi')

let user_name = Joi.string()
let password = Joi.string()

const UserSchema = {
    username: user_name.required(),
    password: password.required()
}

module.exports = UserSchema
