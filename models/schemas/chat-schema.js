const Joi = require('joi')

let created_at = Joi.date()
let messages = Joi.array().items(Joi.object())

const chatSchema = {
    created_at,
    messages
}

module.exports = chatSchema