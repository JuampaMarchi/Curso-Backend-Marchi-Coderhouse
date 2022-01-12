import { Router } from "express";

export const cartRouter = new Router()

cartRouter.get('/', (req, res) => {
    res.send(`Raiz del Carrito`)
})