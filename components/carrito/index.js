import { router } from "../carrito/controllers/index.js"

export const apiCarrito = app => {
    app.use('/api/carrito', router)
}