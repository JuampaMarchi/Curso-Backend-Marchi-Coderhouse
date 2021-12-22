import { Router } from "express";


export const messageRouter = new Router()

router.get('/', (req, res)=>{
    res.send('Hola desde mensajes')
})