import { router as RouterCarrito } from "../carrito/controllers/index.js"
import { Router } from "express"

const router = new Router()

router.use('/carrito', RouterCarrito)

export {router}