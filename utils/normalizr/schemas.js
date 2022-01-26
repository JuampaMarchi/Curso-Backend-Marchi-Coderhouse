import { schema, normalize, denormalize } from "normalizr";

const userSchema = new schema.Entity('users')

const mensajeSchema = new schema.Entity('message', {
    remitente: userSchema
})

const chatSchema =  new schema.Entity('chatLog', {
    mensaje: [mensajeSchema],
    author: userSchema
}, {idAttribute: 'enviado'})

export const normalizedObj = (chat) => normalize(chat, [chatSchema])



