const {Server: SocketIO} = require('socket.io')
const { normalizedObj, denormalizeObj } = require('../normalizr/schemas.js') 
const printObj = require('../obj_printer/index')
const ChatLog = require('../../components/container/controllers/chat')
const ChatServer = new ChatLog()

class Socket {
    static instance
    constructor(http){
        if(Socket.instance){
            return Socket.instance
        }
        Socket.instance = this
        this.io = new SocketIO(http)
        this.users = []
    }
    init(){
        try {
            this.io.on('connection', async socket=>{
                console.log('Usuario contectado!')
                const mongoData = await ChatServer.bringMessages()
                const chatLog = mongoData.map((e)=>{
                    return {
                        author: e.author,
                        mensaje: e.mensaje,
                        enviado: e.enviado
                    }
                })
                const normChat = normalizedObj(chatLog)
                const denormChat = denormalizeObj(normChat)
                socket.emit('init', normChat)

                socket.on('message', async data=>{
                    await ChatServer.insertMessage(data)
                    const newChatLogRaw = await ChatServer.bringMessages()
                    const newChatLog = newChatLogRaw.map((e)=>{
                        return {
                            author: e.author,
                            mensaje: e.mensaje,
                            enviado: e.enviado
                        }
                    })
                    const normNewChatLog = normalizedObj(newChatLog)
                    this.io.sockets.emit('emitToAll', normNewChatLog)
                })

                socket.on('addUser', data=>{
                    console.log('usuario recibido')
                    const newUser = {
                        socket_id: socket.id,
                        ...data,
                        active: true
                    }
                    this.users.push(newUser)
                    this.io.sockets.emit('loadUsers', this.users)
                })

                socket.on('disconnect', data=>{
                    console.log('Usuario desconectado...')
                })
            })
        } catch (err) {
            throw new Error(`Ocurrio el siguiente error: ${err}`)
        }
    }
    // initProd(){
    //     try {
    //         this.io.on('connection', socket=>{
    //             socket.emit('sendProd', this.products)
    //             socket.on('loadProd', async data=>{
    //                 insertProduct(data)
    //                 const newProd = await bringLastProd()
    //                 this.products.push(newProd)
    //                 this.io.sockets.emit('sendToAll', newProd)
    //             })
    //         })
    //     } catch (err) {
    //         throw new Error(`Ocurrio el siguiente error: ${err}`)
    //     }
    // }
}

module.exports = Socket