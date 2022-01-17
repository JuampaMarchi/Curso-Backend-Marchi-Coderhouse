import { Router } from "express";
import { getProducts } from "../components/producto/controllers/MariaDB.js";
import { listar } from "../components/producto/controllers/mongo.js";

export const productRouter = new Router()

productRouter.get('/', listar)