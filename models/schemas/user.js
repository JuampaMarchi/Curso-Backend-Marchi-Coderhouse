const Joi = require('joi')

let username = Joi.string()
let password = Joi.string()
let email = Joi.string()


const UserSchema = {
    username,
    password,
    email
}

module.exports = UserSchema
