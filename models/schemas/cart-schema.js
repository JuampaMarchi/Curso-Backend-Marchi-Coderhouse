const Joi = require('joi')

let owner_name = Joi.string()
let email = Joi.string()
let products = Joi.array().items(Joi.object())
let active = Joi.boolean()
let total = Joi.number()

const CartSchema = {
    owner_name,
    email,
    active,
    products,
    total
}

module.exports = CartSchema