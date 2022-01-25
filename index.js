import express from 'express'
import { config } from "dotenv";
config()
const app = express()
const PORT = process.env.port

//MIDDLEWARES

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next)=>{
    res.send('Hola desde la raiz')
})

app.listen(PORT, ()=>{
    console.log(`Server on desde http://localhost:${PORT}`)
})