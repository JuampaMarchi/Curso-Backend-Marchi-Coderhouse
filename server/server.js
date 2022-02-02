import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import passport from 'passport'
import path, { dirname } from 'path'
import { loginStrategy, registerStrategy, serialize, deserialize } from '../utils/passport/strategies.js'
import { fileURLToPath } from 'url'
import { Socket } from '../utils/socket/index.js'
import { Server as HttpServer } from 'http'
import { dbConfig, db } from '../config/index.js'
import { rootRouter } from '../routes/root.js'
import { prodRouter } from '../routes/products.js'
import { messageRouter } from '../routes/messages.js'
import { chatRouter } from '../routes/chat.js'
import { cartRouter } from '../routes/cart.js'
import { testRouter } from '../routes/product-test.js'
const __dirname = dirname(fileURLToPath(import.meta.url))

export class Server {
    constructor(){
        this.app = express()
        this.port = dbConfig.port
        this.mainPath = '/'
        this.chatPath = '/chat'
        this.prodPath = '/api/products'
        this.messagePath = '/api/message'
        this.cartPath = '/api/cart'
        this.testPath = '/api/products-test'
        this.middlewares()
        this.session()
        this.passport()
        this.routes()
        this.viewEngine()
    }
    middlewares(){
        this.app.use(cors(db.cors))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cookieParser())
    }
    session(){
        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: db.mongo_atlas,
                mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}
            }),
            secret: 'nadieLoSabe',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000,
            }
        }))
        this.app.use(passport.initialize())
        this.app.use(passport.session())
    }
    passport(){
        loginStrategy();
        registerStrategy();
        serialize();
        deserialize()
    }
    routes(){
        this.app.use(this.mainPath, rootRouter)
        this.app.use(this.chatPath, chatRouter)
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