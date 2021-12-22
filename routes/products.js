import { Router } from "express";


export const prodRouter = new Router()

prodRouter.get('/', (req, res)=>{
    res.send('Hola desde productos')
})