import { Router } from "express";
import { bringMessages } from "../components/container/controllers/messages.js";

export const messageRouter = new Router()

messageRouter.get('/', async (req, res)=>{
    const list = await bringMessages()
    res.json(list)
})