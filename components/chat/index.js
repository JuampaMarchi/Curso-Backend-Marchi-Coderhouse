const chatController = require('./controllers/chatController')
const { Router } = require('express')

const chatRouter = new Router()

module.exports = app => {
    app.use('/chat', chatRouter)

    chatRouter.get('/log', chatController.list)
    chatRouter.get('/', chatController.get)
    chatRouter.put('/:id', chatController.get)
    chatRouter.delete('/:id', chatController.get)
}