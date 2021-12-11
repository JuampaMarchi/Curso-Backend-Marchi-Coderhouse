import moment from "moment";
import { Router } from "express";
import { Carrito, bringCart, newId, writeCart } from "../services/index.js";
import { list } from "../../producto/services/index.js";

const router = new Router()

router.get('/', (req, res, next)=>{
    res.send('Hola desde carrito')
})
router.post('/', async (req, res, next)=>{
    const cartData = req.body
    const cartArray = bringCart()
    let newCartId = newId()
    const stamp = moment().format("DD/MM/YYYY HH:mm:ss")
    const newCart = new Carrito(newCartId, stamp, cartData)
    cartArray.push(newCart)
    writeCart(cartArray)
    res.send(`El carrito fue creado bajo el id: ${newCartId}`)
    return newCartId
})
router.delete('/:id', async (req, res, next)=>{
    const {id} = req.params
    const cartArray = bringCart()
    const userCart = cartArray.find(e => e.id == id)
    if(!userCart){
        return res.status(404).send()
    }
    userCart = {}
    cartArray.splice(cartArray.indexOf(userCart, 1))
    writeCart(cartArray)
    res.send(`El carrito con id ${id} fue elimiado`)
})
router.get('/:id/productos', async (req, res, next)=>{
    const {id} = req.params
    const cartArray = bringCart()
    const userCart = cartArray.find(e => e.id == id)
    if(!userCart){
        return res.status(404).send()
    }
    res.json(userCart)
})
router.post('/:id/productos', async (req, res, next)=>{
    const {id} = req.params
    const cartArray = bringCart()
    const userCart = cartArray.find(e => e.id == id)
    if(!userCart){
        return res.status(404).send()
    }
    const {prodId} = req.query
    const prodList = list()
    const prod = prodList.find(e => e.id == prodId)
    if(!prod){
        return res.send(`El id de producto seleccionado es incorrecto`)
    }
    userCart.products.push(prod)
    writeCart(cartArray)
    res.send(`El producto con id ${prodId} fue exitosamente cargado al carrito`)
})
router.delete('/:id/productos/:prod_id', async (req, res, next)=>{
    const {id, prod_id} = req.params
    const cartArray = bringCart()
    const userCart = cartArray.find(e => e.id == id)
    if(!userCart){
        return res.status(404).send()
    }
    const prod = userCart.products.find(e => e.id == prod_id)
    if(!prod){
        return res.status(404).send()
    }
    userCart.products.splice(userCart.products.indexOf(prod), 1)
    writeCart(cartArray)
    res.send(`El producto con id ${prod_id} fue eliminado del carrito con id ${id}`)
})

export {router}