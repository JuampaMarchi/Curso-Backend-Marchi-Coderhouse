const AuthController = require('./controllers/authController')
const { Router } = require('express')

const AuthRouter = new Router()

module.exports = app => {
    app.use('/auth', AuthRouter)

    AuthRouter.get('/', AuthController.login)
    AuthRouter.post('/', AuthController.loginController)
    AuthRouter.post('/verifytoken', AuthController.verifyTokenController)
}

