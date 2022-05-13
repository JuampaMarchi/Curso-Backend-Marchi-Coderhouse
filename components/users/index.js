const userController = require('./controllers/userController')
const jwtAuth = require('../../utils/jwt/jwtMiddleware')
const { Router } = require('express')

const UserRouter = new Router()

module.exports = app => {
    app.use('/user', UserRouter)

    UserRouter.get('/', jwtAuth.auth, userController.getCurrent)
    UserRouter.get('/all', jwtAuth.auth, userController.get)
    UserRouter.get('/:id', jwtAuth.auth, userController.getOne)
    UserRouter.post('/register', userController.create)
    UserRouter.put('/:id', jwtAuth.auth, userController.update)
    UserRouter.delete('/:id', jwtAuth.auth, userController.delete)
}
