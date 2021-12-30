import { Server } from './server/server.js'
import { listProducts } from './components/container/controllers/products.js';

const server = new Server();

server.webSocket()
const a = await listProducts()
console.log(a)
