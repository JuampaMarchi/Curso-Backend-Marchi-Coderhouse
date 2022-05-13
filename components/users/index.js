const userController = require('./controllers/userController')
const { Router } = require('express')

const UserRouter = new Router()

module.exports = app => {
    app.use('/user', UserRouter)

    UserRouter.get('/', userController.getCurrent)
    UserRouter.get('/all', userController.get)
    UserRouter.get('/:id', userController.getOne)
    UserRouter.post('/register', userController.create)
    UserRouter.put('/:id', userController.update)
    UserRouter.delete('/:id', userController.delete)
}
