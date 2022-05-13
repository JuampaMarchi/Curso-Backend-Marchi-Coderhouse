const Joi = require('joi')

let owner_name = Joi.string()
let email = Joi.string()
let products = Joi.array().items(Joi.object())
let active = Joi.boolean()

const CartSchema = {
    owner_name,
    email,
    active,
    products
}

module.exports = CartSchema