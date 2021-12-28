import {Server as SocketIO} from 'socket.io'
import { listProducts, insertProduct, bringLastProd } from '../../components/container/controllers/products.js'
import { insertMessage, bringMessages, bringMessagesByStamp } from '../../components/container/controllers/messages.js'
import moment from 'moment'
const prodList = await listProducts()
const chatLog = await bringMessages()

export class Socket{
    static instance
    constructor(http){
        if(Socket.instance){
            return Socket.instance
        }
        Socket.instance = this
        this.io = new SocketIO(http)
        this.chatLog = chatLog
        this.users = []
        this.products = prodList
    }
    init(){
        try {
            this.io.on('connection', socket=>{
                console.log('Usuario contectado!')
                socket.emit('init', this.chatLog)
                socket.on('message', async data=>{
                    const stamp = moment().format('DD/MM/YYYY HH:mm:ss')
                    insertMessage({user_name: data.name, message: data.message, sent_at: stamp})
                    const newMessage = await bringMessagesByStamp(stamp)
                    this.chatLog.push(newMessage)
                    this.io.sockets.emit('emitToAll', this.chatLog)
                })
                socket.on('addUser', data=>{
                    console.log('usuario recibido')
                    const newUser = {
                        id: socket.id,
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
    initProd(){
        try {
            this.io.on('connection', socket=>{
                socket.emit('sendProd', this.products)
                socket.on('loadProd', async data=>{
                    insertProduct(data)
                    const newProd = await bringLastProd()
                    this.products.push(newProd)
                    this.io.sockets.emit('sendToAll', newProd)
                })
            })
        } catch (err) {
            throw new Error(`Ocurrio el siguiente error: ${err}`)
        }
    }
}