const mongoose = require('mongoose')
const CartSchema = require('./schemas/cart-schema')

const CartSchemaModel = new mongoose.Schema(CartSchema)

const CartModel = new mongoose.model('carts', CartSchemaModel)

module.exports = CartModel

