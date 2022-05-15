const Joi = require('joi')

let order_id = Joi.string()
let email = Joi.string()
let products = Joi.array().items(Joi.object())
let status = Joi.string()

const CartSchema = {
    order_id,
    email,
    status,
    products
}

module.exports = OrderSchema