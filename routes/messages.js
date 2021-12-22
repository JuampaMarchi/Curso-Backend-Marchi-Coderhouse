import { Router } from "express";


export const messageRouter = new Router()

messageRouter.get('/', (req, res)=>{
    res.send('Hola desde mensajes')
})