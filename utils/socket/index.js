//import { listProducts, insertProduct, bringLastProd } from '../../components/container/controllers/products.js'
// import { insertMessage, bringMessages, bringMessagesByStamp } from '../../components/container/controllers/messages.js'
//const prodList = await listProducts()
import {Server as SocketIO} from 'socket.io'
import { normalizedObj, denormalizeObj } from '../normalizr/schemas.js'
import { printObj } from '../obj_printer/index.js'
import { ChatLog } from '../../components/container/controllers/chat.js'
const ChatServer = new ChatLog()


export class Socket{
    static instance
    constructor(http){
        if(Socket.instance){
            return Socket.instance
        }
        Socket.instance = this
        this.io = new SocketIO(http)
        this.users = []
        //this.products = prodList
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
                console.log(printObj(denormChat))
                //console.log(printObj(Object.values(normChat.entities.chatLog)))
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