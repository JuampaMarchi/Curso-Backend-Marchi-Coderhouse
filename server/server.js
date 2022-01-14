import express, { urlencoded } from 'express'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { mainRouter } from '../routes/index.js'
import { productRouter } from '../routes/products.js'
import { cartRouter } from '../routes/cart.js'
import { dbConfig, db } from '../config/index.js'
const __dirname = dirname(fileURLToPath(import.meta.url))

export class Server {
    constructor(){
        this.app = express();
        this.port = dbConfig.port || 8080;
        this.mainPath = '/';
        this.cartPath = '/api/cart';
        this.prodPath = '/api/products';
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(cors(db.cors))
        this.app.use(express.json)
        this.app.use(express.urlencoded({extended: true}))
    }
    routes(){
        this.app.use(this.mainPath, mainRouter)
        this.app.use(this.cartPath, cartRouter)
        this.app.use(this.prodPath, productRouter)
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`)
        })
    }
}
