import Joi from "joi";

let author = Joi.object
let auth_id = Joi.string()
let auth_name = Joi.string()
let auth_lastName = Joi.string()
let auth_edad = Joi.string()
let auth_alias = Joi.string()
let auth_avatar = Joi.string()
let message = Joi.string()
let enviado = Joi.date()

export const chatSchema = {
    author: {
        id: auth_id,
        nombre: auth_name,
        apellido: auth_lastName,
        edad: auth_edad,
        alias: auth_alias,
        avatar: auth_avatar
    },
    mensaje: message.required(),
    enviado: enviado
}