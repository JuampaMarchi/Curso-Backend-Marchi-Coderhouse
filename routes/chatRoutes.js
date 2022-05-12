const { Router } = require('express')
const ChatController = require('../components/chat/controllers/chatController')

const ChatRouter = new Router()

ChatRouter.get('/log', ChatController.list)

module.exports = ChatRouter

