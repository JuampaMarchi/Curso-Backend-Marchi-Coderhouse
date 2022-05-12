const AuthServices = require('../services/authService')
const pino = require('../../../utils/logger/pino')

class AuthController {
    async loginController(req, res){
        try {
            const { username, password } = req.body
            if(!username || !password) throw new Error('Falta ingresar algun datos!')
            const response = await AuthServices.login(username, password);
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
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