import { Server } from './server/server.js'
import { insertProduct } from './components/container/controllers/products.js';

const server = new Server();

server.webSocket()

insertProduct({name: 'producto 9', price: 90})