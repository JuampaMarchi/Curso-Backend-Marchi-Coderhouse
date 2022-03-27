const { Router } = require('express')
const cartController = require('../components/cart/controller/cart')

const cartRouter = new Router()

cartRouter.get('/', cartController.bringCart)

cartRouter.post('/purchase', cartController.endPurchase)

module.exports = cartRouter