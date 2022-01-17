import { Router } from "express";
import { getProducts, insertProduct, updateProduct, deleteProduct } from "../components/producto/controllers/MariaDB.js";
import { listar } from "../components/producto/controllers/mongo.js";

export const productRouter = new Router()

productRouter.get('/', getProducts)

productRouter.post('/insert', insertProduct)

productRouter.put('/update/:id', updateProduct)

productRouter.delete('/del/:id', deleteProduct)