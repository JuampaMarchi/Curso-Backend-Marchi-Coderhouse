const { schema, normalize, denormalize } = require('normalizr')

const userSchema = new schema.Entity('users', {}, {idAttribute: 'alias'})

const chatSchema =  new schema.Entity('chatLog', {
    author: userSchema
}, {idAttribute: 'enviado'})

const normalizedObj = (chat) => normalize(chat, [chatSchema])

const denormalizeObj = (normObj) => denormalize(normObj.result, [chatSchema], normObj.entities)

module.exports = { normalizedObj, denormalizeObj}



