import express from 'express'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Socket } from '../utils/socket/index.js'
import { Server as HttpServer } from 'http'
import { dbConfig, db } from '../config/index.js'
import { prodRouter } from '../routes/products.js'
import { messageRouter } from '../routes/messages.js'

//path.join(__dirname, "../views", "ejs"))

export class Server {
    constructor(){
        this.app = express(),
        this.port = dbConfig.port
        this.prodPath = '/api/products',
        this.messagePath = '/api/message',
        this.middlewares(),
        this.routes()
        this.webSocket()
    }
    middlewares(){
        this.app.use(cors(db.cors))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }
    routes(){
        this.app.use(this.prodPath, prodRouter)
        this.app.use(this.messagePath, messageRouter)
    }
    webSocket(){
        const httpServer = new HttpServer(app)
        const socket = new Socket(httpServer)
        socket.init()
        socket.initProd()
        httpServer.listen(this.port, ()=>{
            console.log(`Servidor iniciado en http://localhost:${this.port}`)
        })
    }
    listen(){
        
    }
}