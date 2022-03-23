const {Server: SocketIO} = require('socket.io')
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
                socket.emit('init', chatLog)

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
                    this.io.sockets.emit('emitToAll', newChatLog)
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
}

module.exports = Socket