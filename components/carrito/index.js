import {Router} from 'express'

const router = new Router()

export const apiCarrito = app => {
    app.use('/api/carrito', router)
    router.get('/', (req, res, next)=>{
        console.log(req.body)
        res.send('Hola desde carrito')
    })
}