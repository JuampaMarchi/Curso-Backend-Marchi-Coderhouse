const pino = require('../../../utils/logger/pino')
const authServices = require('../../auth/services/authService')
const chatServices = require('../services/chatServices')

class ChatController {
    async list(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const sessions = await chatServices.listAll()
            res.json(sessions)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    async get(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload) return res.status(401).send('Error de autenticacion. Por favor vuelva a loguearse')
            res.status(200).render('chat', {payload})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
}

module.exports = new ChatController()