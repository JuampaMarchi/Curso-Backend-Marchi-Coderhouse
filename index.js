const express = require('express')
const { fork } = require('child_process')

const app = express()
const process_fork = fork('./calculation_fork.js')
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const randomNum = () => Math.round(Math.random() * 1000)  

const countNumbers = (obj, iter) => {
    for (let i = 0; i < iter; i++) {
        let res = randomNum()
        if(!obj[res]){
            obj[res] = 1
        } else {
            obj[res] += 1
        }
    }
    return obj
}

app.get('/', (req, res) => {
    res.send('Estas en la raiz')
})

app.get('/calculo-bloq', (req, res) => {
    let { cant } = req.query
    if(!cant) {
        let result = countNumbers({}, 1000000000)
        return res.json(result)
    }
    let result = countNumbers(numObj, cant)
        return res.json(result)
})

app.get('/calculo-nobloq', (req, res)=> {
    let { cant } = req.query
    if(!cant){
        process_fork.send({num: 10000000})
        process_fork.on('message', data => {
            return res.json(data)
        })
    } else {
        process_fork.send({num: cant})
        process_fork.on('message', data => {
            return res.json(data)
        })
    }
    
})

app.listen(PORT, ()=>{
    console.log(`Escuchando desde http://localhost:${PORT}`)
}) 