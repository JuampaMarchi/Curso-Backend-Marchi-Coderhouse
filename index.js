import express from "express";
import { config } from "dotenv";
import { serverRouter } from "./routes/index.js";

const app = express()
const PORT = 8080
config()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
serverRouter(app)

app.listen(PORT, ()=>{
    console.log(`Escuchando desde http://localhost:${process.env.PORT}`)
}) 