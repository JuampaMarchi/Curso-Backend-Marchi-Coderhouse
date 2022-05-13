const Joi = require('joi')

let username = Joi.string()
let password = Joi.string()
let email = Joi.string()
let role = Joi.string()
let token = Joi.string()

const UserSchema = {
    username,
    password,
    email,
    role,
    token
}

module.exports = UserSchema
