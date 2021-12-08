//const fs = require('fs')
const {Server: SocketIO} = require('socket.io')

class Socket{
    static instance
    constructor(http){
        if(Socket.instance){
            return Socket.instance
        }
        Socket.instance = this
        this.io = new SocketIO(http)
        this.chatLog = []
        this.users = []
        this.products = []
    }
    init(){
        try {
            this.io.on('connection', socket=>{
                console.log('Usuario contectado!')
                socket.emit('init', this.chatLog)
                socket.on('message', data=>{
                    this.chatLog.push(data)
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
    // initProd(){
    //     try {
    //         this.io.on('connection', socket=>{
    //             console.log('Conectado. Cargando productos...')
    //             const prodList = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'))
    //             this.products.push(prodList)
    //             console.log(this.products)
    //             socket.emit('sendProd', this.products)
    //             socket.on('loadProd', data=>{
    //                 this.products.push(data)
    //                 this.io.sockets.emit('sendToAll', this.products)
    //             })
    //         })
    //     } catch (err) {
    //         throw new Error(`Ocurrio el siguiente error: ${err}`)
    //     }
    // }
}

module.exports = Socket;