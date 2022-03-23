const { Router } = require('express')

const cartRouter = new Router()

cartRouter.get('/', (req, res) => {
    res.send(`Raiz del Carrito`)
})

module.exports = cartRouter