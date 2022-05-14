const Joi = require('joi')

let username = Joi.string()
let fullname = Joi.string()
let password = Joi.string()
let email = Joi.string()
let role = Joi.string()

const UserSchema = {
    username,
    fullname,
    password,
    email,
    role
}

module.exports = UserSchema
