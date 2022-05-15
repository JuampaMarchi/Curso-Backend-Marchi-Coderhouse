const Joi = require('joi')

let product_name = Joi.string()
let price = Joi.number()
let description = Joi.string()
let category = Joi.string()
let url = Joi.string()
let stock = Joi.number()

const ProductSchema = {
    product_name,
    category,
    description,
    price,
    stock,
    url
}

module.exports = ProductSchema