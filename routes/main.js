import { Router } from "express";

export const mainRouter = new Router()

mainRouter.get('/', (req, res)=>{
    res.render('index', {products})
})