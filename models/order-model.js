const mongoose = require('mongoose')
const OrderSchema = require('./schemas/order-schema')

const OrderSchemaModel = new mongoose.Schema(OrderSchema)

const OrderModel = new mongoose.model('orders', OrderSchemaModel)

module.exports = OrderModel