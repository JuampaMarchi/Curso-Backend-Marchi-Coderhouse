import { apiProductos } from "../components/producto/index.js";
import { apiCarrito } from "../components/carrito/index.js";

export const serverRouter = app => {
    apiProductos(app)
    apiCarrito(app)
    app.get('/', (req, res)=>{
        res.send('Todo listo en la raiz')
    })
    app.get('/api', (req, res)=>{
        res.send('Todo listo en la API')
    })
    app.all('*', (req, res)=>{
        const response = { error : -2, descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`}
        res.status(404).send(response)
    })
}