import { router as RouterProductos } from "./controllers/index.js"
import { Router } from "express"

const router = new Router()

router.use('/productos', RouterProductos)

export {router}