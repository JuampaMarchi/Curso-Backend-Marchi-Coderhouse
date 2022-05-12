const Chat = require('../services/chatServices')
const pino = require('../../../utils/logger/pino')

class ChatController {
    async list(req, res){
        try {
            const messages = await Chat.list()
            if(!messages) return res.send('No se encontraron mensajes')
            const chatLog = []
            messages.forEach(e => chatLog.push({name: e.name, message: e.message, sent_at: e.sent_at}))
            res.json(chatLog)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new ChatController()