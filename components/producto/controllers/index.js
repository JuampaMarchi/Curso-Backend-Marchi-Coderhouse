import moment from "moment";
import { Router } from "express";
import { list, Product, newId, writeList, updateProd } from "../services/index.js";

const router = new Router()

router.get('/', async (req, res, next)=>{
    const prodList = await list()
    res.json(prodList)
})
router.get('/:id', async (req, res, next)=>{
    const prodList = await list()
    const {id} = req.params
    const filter = prodList.find(e=> e.id == id)
    if(!filter){
        return res.status(404).send()
    }
    res.json(filter)
})
router.post('/', async (req, res, next)=>{
    const prodList = await list()
    const data = req.body
    const itemId = newId(prodList)
    const stamp = moment().format("DD/MM/YYYY HH:mm:ss")
    const item = new Product(itemId, stamp, data.name, data.description, data.code, data.picture, data.price, data.stock)
    prodList.push(item)
    const newList = JSON.stringify(prodList)
    writeList(newList)
    return itemId
})
router.put('/:id', async (req, res, next)=>{
    const prodList = await list()
    const {id} = req.params
    const item = prodList.find(e => e.id == id)
    if(!item){
        return res.status(404).send()
    }
    const newData = req.body
    updateProd(item, newData)
    item.timestamp = moment().format("DD/MM/YYYY HH:mm:ss")
    const newList = JSON.stringify(prodList)
    writeList(newList)
    res.send(`Producto con id ${id} actualizado el: ${item.timestamp}`)
})
router.delete('/:id', async (req, res, body)=>{
    const prodList = await list()
    const {id} = req.params
    const item = prodList.find(e => e.id == id)
    if(!item){
        return res.status(404).send()
    }
    prodList.splice(prodList.indexOf(item, 1))
    const newList = JSON.stringify(prodList)
    writeList(newList)
})

export { router }
