import express from 'express'
import { Database } from './config/db.js'
import { dbconfig, db } from './config/index.js'
import cors from 'cors'
const app = express()
const PORT = dbconfig.port
const db_instance = new Database()
const db_obj = db_instance.client

//MIDDLEWARES
app.use(cors(db.cors))

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next)=>{
    res.send('Hola desde la raiz')
})

app.listen(PORT, ()=>{
    console.log(`Server on desde http://localhost:${PORT}`)
})