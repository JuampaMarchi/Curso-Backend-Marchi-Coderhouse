const moment = require('moment')
const express = require('express')
const app = express()
const PORT = 777
const FRASE = 'Hola Viteh'

app.get('/frase', function(req, res, next){
    
    res.json({"frase": FRASE})
})

app.get('/letras/:num', function(req, res, next){
    let {num} = req.params
    let response = null
    if(Number(num)){
        let frase = FRASE.split("");
        let finalNum = num - 1;
        if(finalNum <= frase.length){
            response = frase[finalNum]
        } else {
            response = 'el parametro esta mal'
        }
    } else {
        response = 'hay algo mal'
    }
    res.json({"hola": response})
})

app.listen(PORT, ()=>{
    console.log(`Escuchando desde http:/localhost:${PORT}`)
})







