import { Router } from "express";
import { listProducts } from "../components/container/controllers/products.js";
export const mainRouter = new Router()

mainRouter.get('/', async (req, res)=>{
    const products = await listProducts()
    res.render('index', {products})
})