import { Router } from "express";
import { bringProdById, listProducts } from "../components/container/controllers/products.js";


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