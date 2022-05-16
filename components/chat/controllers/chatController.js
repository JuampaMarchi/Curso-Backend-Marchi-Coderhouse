const pino = require('../../../utils/logger/pino')
const authServices = require('../../auth/services/authService')
const chatServices = require('../services/chatServices')

class ChatController {
    async list(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const messages = await chatServices.listAll()
            if(!messages) return res.send('No se encontraron mensajes')
            const chatLog = []
            messages.forEach(e => chatLog.push({name: e.name, message: e.message,type: e.type, sent_at: e.sent_at}))
            res.json(chatLog)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    async get(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload) return res.status(401).render('error-auth')
            res.status(200).render('chat', {payload})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
}

module.exports = new ChatController()