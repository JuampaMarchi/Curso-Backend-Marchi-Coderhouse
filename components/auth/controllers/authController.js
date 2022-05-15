const AuthServices = require('../services/authService')
const pino = require('../../../utils/logger/pino')

class Auth {
    //Vista para hacer el log in
    async login(req, res){
        try {
            const token = req.cookies.token
            const payload = await AuthServices.verifyToken(token)
            if(!payload) return res.status(200).render('log_in')
            res.status(200).redirect('/products')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador de log in, crea Cookie para almacenar Token
    async loginController(req, res){
        try {
            const { username, password } = req.body
            if(!username || !password) return res.status(401).render('error-auth')
            const response = await AuthServices.login(username, password);
            res.status(200).cookie('token', response.token, {maxAge: 3600000}).redirect('/products')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador para desloguear. Solo elimina la cookie que tiene el valor del token.
    async logout(req, res){
        try {
            const token = req.cookies.token
            const payload = await AuthServices.verifyToken(token)
            if(!payload) return res.status(401).render('error-auth')
            res.status(200).clearCookie('token').render('logout', {payload})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador de verificacion de Token
    async verifyTokenController(req, res){
        try {
            const { token } = req.body
            if(!token) return res.status(401).render('error-auth')
            const response = await AuthServices.verifyToken(token);
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
}

module.exports = new Auth()