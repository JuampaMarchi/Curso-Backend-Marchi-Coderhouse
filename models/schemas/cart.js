import Joi from "joi";

let items = Joi.array().default([])
let itemQty = Joi.number().min(1).default(0)
let total = Joi.number().min(1).default(0)

export const cartSchema = {
    items: items.required(),
    itemQty: itemQty.required(),
    total: total.required()
}