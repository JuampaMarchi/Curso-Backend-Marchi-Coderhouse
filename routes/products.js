import { Router } from "express";
import { bringProdById, listProducts, insertProduct, deleteProducts, updateName, updatePrice } from "../components/container/controllers/products.js";


export const prodRouter = new Router()

prodRouter.get('/', async (req, res)=>{    
    const list = await listProducts()
    console.log(list)
    res.json(list)
})

prodRouter.get('/:id', async (req, res)=>{
    const { id } = req.params
    const prod = await bringProdById(id)
    res.json(prod)
})

prodRouter.post('/insert', async (req, res)=>{
    const { item } = req.body
    insertProduct(item)
    res.send(`El producto fue cargado con exito`)
})

prodRouter.put('/update-name:id', async (req, res) => {
    const { item } = req.body
    const { id } = req.params
    await updateName(id, item.name)
    res.send(`El nombre del producto con id "${id}" fue actualizado.`)
})

prodRouter.put('/update-price:id', async (req, res) => {
    const { item } = req.body
    const { id } = req.params
    await updatePrice(id, item.name)
    res.send(`El precio del producto con id "${id}" fue actualizado.`)
})

prodRouter.delete('/delete:id', async (res, req) => {
    const { id } = req.params
    await deleteProducts(id)
    res.send(`El producto con id "${id}" fue borrado.`)
})