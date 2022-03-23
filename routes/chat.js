const { Router } = require('express')
import { listProducts } from "../components/container/controllers/products.js";

const chatRouter = new Router()

chatRouter.get('/', async (req, res)=>{
    const products = await listProducts()
    res.render('index', {products, user})
})

module.exports = chatRouter