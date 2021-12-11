import moment from "moment";
import { Router } from "express";
import { Carrito, bringCart, newId } from "../services/index.js";

const router = new Router()

router.get('/', (req, res, next)=>{
    res.send('Hola desde carrito')
})
router.post('/', (req, res, next)=>{
    const cartData = req.body
    const cartArray = bringCart()
    let newCartId = newId()
    const stamp = moment().format("DD/MM/YYYY HH:mm:ss")
    const newCart = new Carrito(newCartId, stamp, cartData)
})

export {router}