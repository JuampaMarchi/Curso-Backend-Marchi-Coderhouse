import { Router } from "express";
import { getCarts, insertCart, updateCart, deleteCart } from "../components/carrito/controllers/cart.js";

export const cartRouter = new Router()

cartRouter.get('/', getCarts)

cartRouter.post('/insert', insertCart)

cartRouter.put('/update/:id', updateCart)

cartRouter.delete('/del/:id', deleteCart)