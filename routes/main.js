import { Router } from "express";
const products = {}


export const mainRouter = new Router()

mainRouter.get('/', (req, res)=>{
    res.render('index', {products})
})