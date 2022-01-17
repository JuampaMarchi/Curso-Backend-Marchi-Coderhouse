import { Router } from "express";

export const mainRouter = new Router()

mainRouter.get('/', (req, res) => {
    res.send('Hola, estas en la raiz')
})

