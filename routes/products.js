import { Router } from "express";


export const prodRouter = new Router()

router.get('/', (req, res)=>{
    res.send('Hola desde productos')
})