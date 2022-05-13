const AuthServices = require('../services/authService')
const pino = require('../../../utils/logger/pino')
const { session } = require('passport')

class AuthController {
    //Vista para hacer el log in
    async login(req, res){
        try {
            res.status(200).render('log_in')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Vista para el registro
    async register(req, res){
        try {
            res.status(200).render('register')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Controlador de log in
    async loginController(req, res){
        try {
            const { username, password } = req.body
            if(!username || !password) throw new Error('Falta ingresar algun datos!')
            const response = await AuthServices.login(username, password);
            sessionStorage.setItem('token', response.token)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Controlador de verificacion de Token
    async verifyTokenController(req, res){
        try {
            const { token } = req.body
            if(!token) throw new Error('Faltan el Token')
            const response = await AuthServices.verifyToken(token);
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new AuthController()