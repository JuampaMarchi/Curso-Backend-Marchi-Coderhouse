import express from "express";
import { config } from "dotenv";
import { serverRouter } from "./routes/index.js";

const app = express()
config()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
serverRouter(app)

app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando desde http://localhost:${process.env.PORT}`)
}) 