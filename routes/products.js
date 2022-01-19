import { Router } from "express";
import { getProducts, insertOneProduct, insertManyProducts, updateProduct, deleteProduct} from '../components/producto/controllers/products.js'

export const productRouter = new Router()

productRouter.get('/', getProducts)

productRouter.post('/insert', insertOneProduct)

productRouter.post('/insert-many', insertManyProducts)

productRouter.put('/update/:id', updateProduct)

productRouter.delete('/del/:id', deleteProduct)