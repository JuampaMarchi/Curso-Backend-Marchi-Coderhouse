const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const config = require('../config/index')
const serverRoutes = require('../routes/index')

class Server {
    constructor(){
        this.app = express()
        this.port = config.config.port
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
        serverRoutes(this.app)
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