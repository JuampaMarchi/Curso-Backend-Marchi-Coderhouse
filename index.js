import { Server } from './server/server.js'
import { bringLastProd } from './components/container/controllers/products.js';

const server = new Server();

server.webSocket()
//bringLastProd()
