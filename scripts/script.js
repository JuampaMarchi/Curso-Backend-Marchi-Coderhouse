const fs = require('fs')
const express = require('express')
const app = express()
const PORT = 8080
const file = fs.readFileSync('./productos.json', 'utf-8')
let fileObject = JSON.parse(file)

app.get('/', function(req, res, next){
    res.send('Hola Mundo')
})

app.get('/productos', function(req, res, next){
    res.send(fileObject)
})

app.get('/productoRandom', function(req, res, next){
    let num = Math.round(Math.random() * fileObject.length)
    res.send(`El producto randomizado es: ${JSON.stringify(fileObject[num])}`)
})

app.listen(PORT, ()=>{
    console.log(`Escuchando desde http://localhost:${PORT}`)
})







