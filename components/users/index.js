const UserController = require('./controllers/userController')
const { Router } = require('express')
const userController = require('./controllers/userController')

const UserRouter = new Router()

module.exports = app => {
    app.use('/user', UserRouter)

    UserRouter.get('/', userController.get)
    UserRouter.get('/:id', userController.getOne)
    UserRouter.post('/', userController.create)
    UserRouter.put('/:id', userController.update)
    UserRouter.delete('/:id', userController.delete)
}
