const Joi = require('joi')

let username = Joi.string()
let password = Joi.string()
let email = Joi.string()
let role = Joi.string()

const UserSchema = {
    username,
    password,
    email,
    role
}

module.exports = UserSchema
