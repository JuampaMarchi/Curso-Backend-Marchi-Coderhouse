import { Server } from './server/server.js'
import { createTable } from './components/container/controllers/messages.js';
//import { listProducts } from './components/container/controllers/products.js';

const server = new Server;

server.webSocket()

//createTable()
//listProducts()