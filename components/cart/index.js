const cartController = require('./controllers/cartController')
const { Router } = require('express')

const CartRouter = new Router()

module.exports = app => {
    app.use('/cart', CartRouter)

    CartRouter.get('/', (req, res) => res.send('Raiz del carrito'))
}
