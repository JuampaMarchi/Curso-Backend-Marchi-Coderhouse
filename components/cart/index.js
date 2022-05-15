const cartController = require('./controllers/cartController')
const { Router } = require('express')

const CartRouter = new Router()

module.exports = app => {
    app.use('/cart', CartRouter)

    CartRouter.get('/', cartController.bringCart)
    CartRouter.post('/add', cartController.addToCart)
    CartRouter.put('/:id', cartController.update)
    CartRouter.delete('/:id', cartController.delete)
}
