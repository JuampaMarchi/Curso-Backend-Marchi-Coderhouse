const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const config = require('../config/index')
const rootRouter = require('../routes/root')
const cartRouter = require('../routes/cart')
const chatRouter = require('../routes/chatRoutes')

class Server {
    constructor(){
        this.app = express()
        this.port = config.config.port
        this.mainPath = '/'
        this.cartPath = '/api/cart'
        this.chatPath = '/api/chat'
        this.middlewares()
        this.routes()
        this.viewEngine()
    }
    middlewares(){
        this.app.use(cors(config.config.cors))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cookieParser())
    }
    routes(){
        this.app.use(this.mainPath, rootRouter)
        this.app.use(this.cartPath, cartRouter)
        this.app.use(this.chatPath, chatRouter)
    }
    viewEngine(){
        this.app.set('views', path.join(__dirname, "../views", "ejs"))
        this.app.set('view engine', 'ejs')
    }
    initialize(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor iniciado en http://localhost:${this.port}`)
        })
    }
}

module.exports = Server