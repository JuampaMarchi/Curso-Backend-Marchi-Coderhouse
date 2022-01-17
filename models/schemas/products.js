import Joi from "joi";

let name = Joi.string().min(3)
let price = Joi.number().min(1)
let stock = Joi.number().min(1)

export const productSchema = {
    name: name.required(),
    price: price.required(),
    stock: stock.required()
}