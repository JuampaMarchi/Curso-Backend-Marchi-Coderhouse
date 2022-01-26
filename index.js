import express from "express";

const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, ()=>{
    console.log(`Escuchando desde http://localhost:${PORT}`)
}) 