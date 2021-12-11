import { Router } from "express";
import { list } from "../services/index.js";

const router = new Router()

router.get('/', async (req, res, next)=>{
    const prodList = await list()
    res.json(prodList)
})
router.get('/:id',async (req, res, next)=>{
    const prodList = await list()
    const {id} = req.params
    const filter = prodList.find(e=> e.id == id)
    if(!filter){
        return res.status(404).send()
    }
    res.json(filter)
})

export { router }
