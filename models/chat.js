const mongoose = require('mongoose')
const chatSchema = require('./schemas/chat')

const chatSchemaModel = new mongoose.Schema(chatSchema)

const ChatModel = new mongoose.model('mensajes', chatSchemaModel)

module.exports = ChatModel