const userController = require('./controllers/userController')
const orderController = require('./controllers/orderController')
const { Router } = require('express')

const UserRouter = new Router()

module.exports = app => {
    app.use('/user', UserRouter)

    UserRouter.get('/', userController.getCurrent)
    UserRouter.get('/all', userController.get)
    UserRouter.get('/register', userController.register)
    UserRouter.get('/orders', orderController.getAll)
    UserRouter.get('/orders/:id', orderController.getOne)
    UserRouter.get('/user-orders', orderController.getUserOrdersView)
    UserRouter.get('/user-orders-admin', orderController.getUserOrders)
    UserRouter.post('/create', userController.create)
    UserRouter.get('/:id', userController.getOne)
    UserRouter.put('/:id', userController.update)
    UserRouter.delete('/:id', userController.delete)
}
