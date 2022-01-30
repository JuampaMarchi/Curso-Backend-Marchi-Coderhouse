import { Router } from "express";
import { listProducts } from "../components/container/controllers/products.js";
export const chatRouter = new Router()

chatRouter.get('/', async (req, res)=>{
    const products = await listProducts()
    res.render('index', {products, user})
})