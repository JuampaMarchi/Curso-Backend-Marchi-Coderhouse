import fs from 'fs'
import express from 'express'
import { Socket } from './utils/socket/index.js'
import { Server as HttpServer } from 'http'
import { Router } from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const router = new Router;
const app = express()
const PORT = 8080


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'))
//Inicilizar Router
app.use('/', router)

//Motor Plantillas
app.set('views', path.join(__dirname, "views", "ejs"))
app.set('view engine', 'ejs')

const httpServer = new HttpServer(app)
const socket = new Socket(httpServer)
const products = socket.products
socket.init()
socket.initProd()

router.get('/', (req, res, next)=>{
    res.render('index', {products})
})

router.post('/productos', (req, res, next)=>{
    const newProd = req.body
    console.log(req.body)
    newProd.id = products.length + 1
    products.push(newProd)
    fs.writeFileSync('./productos.json', JSON.stringify(products))
    res.redirect('/')
})

httpServer.listen(PORT, ()=>{
    console.log(`Server on desde http://localhost:${PORT}`)
})