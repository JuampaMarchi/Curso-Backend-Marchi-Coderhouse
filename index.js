const express = require('express')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'))

app.get('/', (req, res, next)=>{
    res.send('Hola desde la raiz')
})

app.listen(PORT, ()=>{
    console.log(`Server on desde http://localhost:${PORT}`)
})