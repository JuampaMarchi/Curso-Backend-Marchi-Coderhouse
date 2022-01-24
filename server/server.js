import express from 'express'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Socket } from '../utils/socket/index.js'
import { Server as HttpServer } from 'http'
import { dbConfig, db } from '../config/index.js'
import { prodRouter } from '../routes/products.js'
import { messageRouter } from '../routes/messages.js'
import { mainRouter } from '../routes/main.js'
import { cartRouter } from '../routes/cart.js'
import { testRouter } from '../routes/product-test.js'
import { ChatLog } from '../components/container/controllers/chat.js'
const __dirname = dirname(fileURLToPath(import.meta.url))

export class Server {
    constructor(){
        this.app = express(),
        this.port = dbConfig.port
        this.mainPath = '/'
        this.prodPath = '/api/products',
        this.messagePath = '/api/message',
        this.cartPath = '/api/cart'
        this.testPath = '/api/products-test'
        this.chat = new ChatLog()
        this.middlewares(),
        this.routes(),
        this.viewEngine()
    }
    middlewares(){
        this.app.use(cors(db.cors))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }
    routes(){
        this.app.use(this.mainPath, mainRouter)
        this.app.use(this.prodPath, prodRouter)
        this.app.use(this.messagePath, messageRouter)
        this.app.use(this.cartPath, cartRouter)
        this.app.use(this.testPath, testRouter)
    }
    viewEngine(){
        this.app.set('views', path.join(__dirname, "../views", "ejs"))
        this.app.set('view engine', 'ejs')
    }
    webSocket(){
        const httpServer = new HttpServer(this.app)
        const socket = new Socket(httpServer)
        socket.init()
        //socket.initProd()
        httpServer.listen(this.port, ()=>{
            console.log(`Servidor iniciado en http://localhost:${this.port}`)
        })
    }
}