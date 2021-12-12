import { router as RouterProd } from "../components/producto/index.js";
import { router as RouterCart } from "../components/carrito/index.js";

export const serverRouter = app => {
    
    app.get('/', (req, res)=>{
        res.send('Todo listo en la raiz')
    })
    app.use('/api', RouterProd, RouterCart)

    app.all('*', (req, res)=>{
        const response = { error : -2, descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`}
        res.status(404).send(response)
    })
}