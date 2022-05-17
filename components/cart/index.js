const cartController = require('./controllers/cartController')
const { Router } = require('express')

const CartRouter = new Router()

module.exports = app => {
    app.use('/cart', CartRouter)

    CartRouter.get('/', cartController.bringCart)
    CartRouter.get('/all', cartController.bringAll)
    CartRouter.post('/add', cartController.addToCart)
    CartRouter.post('/purchase', cartController.endPurchase)
    CartRouter.post('/update', cartController.updateQty)
    CartRouter.put('/:id', cartController.update)
    CartRouter.delete('/:id', cartController.delete)
}
