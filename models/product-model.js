const mongoose = require('mongoose')
const ProductSchema = require('./schemas/product-schema')

const ProductSchemaModel = new mongoose.Schema(ProductSchema)

const ProductModel = new mongoose.model('products', ProductSchemaModel)

module.exports = ProductModel