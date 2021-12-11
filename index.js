import express from "express";
import moment from "moment";
import { serverRouter } from "./routes/index.js";

const app = express()

const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
serverRouter(app)

app.listen(PORT, ()=>{
    console.log(`Escuchando desde http://localhost:${PORT}`)
}) 