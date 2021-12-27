import { Server } from './server/server.js'
import { clearChat } from './components/container/controllers/messages.js';
import moment from 'moment';
const stamp = moment().format('DD/MM/YYYY HH:mm:ss')

const server = new Server();

server.webSocket()

clearChat()



