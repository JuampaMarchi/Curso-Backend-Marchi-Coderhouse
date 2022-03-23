const { Router } = require('express')
const prodDb = require('../components/container/controllers/products')

const prodRouter = new Router()

prodRouter.get('/', async (req, res)=>{    
    const list = await prodDb.listProducts()
    console.log(list)
    res.json(list)
})

prodRouter.get('/:id', async (req, res)=>{
    const { id } = req.params
    const prod = await prodDb.bringProdById(id)
    res.json(prod)
})

prodRouter.post('/insert', async (req, res)=>{
    const { item } = req.body
    prodDb.insertProduct(item)
    res.send(`El producto fue cargado con exito`)
})

prodRouter.put('/update-name:id', async (req, res) => {
    const { item } = req.body
    const { id } = req.params
    await prodDb.updateName(id, item.name)
    res.send(`El nombre del producto con id "${id}" fue actualizado.`)
})

prodRouter.put('/update-price:id', async (req, res) => {
    const { item } = req.body
    const { id } = req.params
    await prodDb.updatePrice(id, item.name)
    res.send(`El precio del producto con id "${id}" fue actualizado.`)
})

prodRouter.delete('/delete:id', async (res, req) => {
    const { id } = req.params
    await prodDb.deleteProducts(id)
    res.send(`El producto con id "${id}" fue borrado.`)
})

module.exports = prodRouter