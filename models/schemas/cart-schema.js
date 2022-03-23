const Joi = require('joi')

let owner_name = Joi.string()
let products = Joi.array().items(Joi.object())

const CartSchema = {
    owner_name,
    products
}

module.exports = CartSchema