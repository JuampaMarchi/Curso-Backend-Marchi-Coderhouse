const Joi = require('joi')

let name = Joi.string()
let email = Joi.string()
let type = Joi.string()
let message = Joi.string()
let sent_at = Joi.date()

const chatSchema = {
    name,
    email,
    type,
    message,
    sent_at
}

module.exports = chatSchema