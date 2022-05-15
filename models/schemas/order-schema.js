const Joi = require('joi')

let order_id = Joi.string()
let email = Joi.string()
let products = Joi.array().items(Joi.object())
let status = Joi.string()
let total = Joi.number()

const OrderSchema = {
    order_id,
    email,
    status,
    products,
    total
}

module.exports = OrderSchema