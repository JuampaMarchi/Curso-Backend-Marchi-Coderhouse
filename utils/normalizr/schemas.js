import { schema, normalize, denormalize } from "normalizr";

const userSchema = new schema.Entity('users', {}, {idAttribute: 'alias'})

const chatSchema =  new schema.Entity('chatLog', {
    author: userSchema
}, {idAttribute: 'enviado'})

export const normalizedObj = (chat) => normalize(chat, [chatSchema])

export const denormalizeObj = (normObj) => denormalize(normObj.result, [chatSchema], normObj.entities)



