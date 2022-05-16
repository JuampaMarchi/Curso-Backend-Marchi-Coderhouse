const pino = require('../../../../utils/logger/pino')
const chatServices = require('../../services/chatServices')
const Moment = require('../../../../utils/moment/moment')
const {Server: SocketIO} = require('socket.io')

class Socket {
    static instance
    constructor(http){
        if(Socket.instance) return Socket.instance
        this.instance = this
        this.io = new SocketIO(http)
    }
    init(){
        try {
            this.io.on('connection', async socket => {
                pino.info(`Usuario conectado con id: ${socket.id}`)
                const initDate = await Moment.date()
                socket.emit('init', [])
                socket.on('message', async data => {
                    pino.info('Mensaje recibio. Enviando a base de datos...')
                    const message = {
                        ...data,
                        sent_at: await Moment.date()
                    }
                    await chatServices.create(message)
                    console.log(initDate)
                    const chatLog = await chatServices.listForChat(initDate)
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