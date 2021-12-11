import { apiProductos } from "../components/producto/index.js";
import { apiCarrito } from "../components/carrito/index.js";

export const serverRouter = app => {
    apiProductos(app)
    apiCarrito(app)
    app.get('/', (req, res, next)=>{
        console.log(req.body)
        res.send('Todo listo en la raiz')
    })
    app.get('/api', (req, res, next)=>{
        console.log(req.body)
        res.send('Todo listo en la API')
    })
}
