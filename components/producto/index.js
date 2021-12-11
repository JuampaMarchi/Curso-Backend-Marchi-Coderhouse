import { router } from "./controllers/index.js"

export const apiProductos = app => {
    app.use('/api/productos', router)
}