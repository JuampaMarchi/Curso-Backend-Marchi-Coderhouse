import { Server } from './server/server.js'
import { insertMessage, bringMessages, createTable } from './components/container/controllers/messages.js';
import { bringProdByName } from './components/container/controllers/products.js';

const server = new Server();

server.webSocket()

//insertMessage({user_name: 'juan', message: 'hola'})
//bringMessages()
// const a = await bringProdByName('producto 1')
// console.log(a)


