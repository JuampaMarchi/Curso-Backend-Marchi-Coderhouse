const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const config = require('../config/index')
const rootRouter = require('../routes/root') 
const prodRouter = require('../routes/products')
const cartRouter = require('../routes/cart') 
const testRouter = require('../routes/product-test')
const cluster_mode = require('./cluster_mode')
const { loginStrategy, registerStrategy, serialize, deserialize } = require('../utils/passport/strategies')

class Server {
    constructor(){
        this.app = express()
        this.port = config.dbConfig.port
        this.mainPath = '/'
        this.prodPath = '/api/products'
        this.cartPath = '/api/cart'
        this.testPath = '/api/products-test'
        this.cpus = config.dbConfig.cpus
        this.middlewares()
        this.session()
        this.passport()
        this.routes()
        this.viewEngine()
    }
    middlewares(){
        this.app.use(cors(config.db.cors))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cookieParser())
    }
    session(){
        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: config.db.mongo_atlas,
                mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}
            }),
            secret: 'nadieLoSabe',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1200000,
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
        this.app.use(this.prodPath, prodRouter)
        this.app.use(this.messagePath, messageRouter)
        this.app.use(this.cartPath, cartRouter)
        this.app.use(this.testPath, testRouter)
    }
    viewEngine(){
        this.app.set('views', path.join(__dirname, "../views", "ejs"))
        this.app.set('view engine', 'ejs')
    }
    initialize(){
        if(config.dbConfig.mode === 'CLUSTER') return cluster_mode(this.app, this.cpus, this.port)

        this.app.listen(this.port, ()=>{
            console.log(`Servidor iniciado en http://localhost:${this.port}`)
        })
    }
}

module.exports = Server