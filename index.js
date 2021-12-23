import { Server } from './server/server.js'
import { insertProduct, listProducts } from './components/container/controllers/products.js'

const server = new Server;

server.webSocket()

const prod = [
    {
        name: 'producto 1',
        price: 10
    },{
        name: 'producto 2',
        price: 20
    },{
        name: 'producto 3',
        price: 30
    }
]

listProducts()