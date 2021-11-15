const moment = require('moment')
const express = require('express')
const app = express()
const PORT = 777

app.get('/', function(req, res, next){
    res.send(`Bienvenido al servidor. Hoy es: ${moment().format('DD/MM/YYYY hh:mm:ss')}`)
})

app.listen(PORT, ()=>{
    console.log(`Escuchando desde puerto: ${PORT}`)
})







