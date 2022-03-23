const { Router } = require('express')
const messageDb = require('../components/container/controllers/messages')

const messageRouter = new Router()

messageRouter.get('/', async (req, res)=>{
    const list = await messageDb.bringMessages()
    res.json(list)
})

module.exports = messageRouter