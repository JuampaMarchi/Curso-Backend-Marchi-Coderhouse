const pino = require('../../../../utils/logger/pino')
const moment = require('moment')
const chatServices = require('../../services/chatServices')
const {Server: SocketIO} = require('socket.io')

class Socket {
    static instance
    constructor(http){
        if(Socket.instance) return Socket.instance
        this.instance = this
        this.io = new SocketIO(http)
        this.sessionId = ''
    }
    async session(){
        try {
            const newSession = await chatServices.createSession({})
            pino.info(`Sesion creada`)
            this.sessionId = newSession._id
        } catch (error) {
            return pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async init(){
        try {
            this.io.on('connection', async socket => {
                socket.id
                pino.info(`Conexion exitosa. Id de Sesion de Chat: ${this.sessionId}`)
                const chatLog = await chatServices.listForChat(this.sessionId)
                socket.emit('init', chatLog)

                socket.on('message', async data => {
                    pino.info('Mensaje recibio. Enviando a base de datos...')
                    const message = {
                        ...data,
                        sent_at: moment().format('DD/MM/YYYY HH:mm:ss')
                    }
                    const chatLog = await chatServices.insertMessage(this.sessionId, message)
                    this.io.sockets.emit('newMessage', chatLog)
                })
                socket.on('disconnect', data=>{
                    console.log('Usuario desconectado...')
                })
            })
        } catch (error) {
            return pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = Socket