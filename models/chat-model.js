const mongoose = require('mongoose')
const chatSchema = require('./schemas/chat-schema')

const chatSchemaModel = new mongoose.Schema(chatSchema)

const ChatModel = new mongoose.model('mensajes', chatSchemaModel)

module.exports = ChatModel