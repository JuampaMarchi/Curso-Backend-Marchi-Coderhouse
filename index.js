const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')
//const handlebars = require('express-handlebars')
let {Router} = express;
let router = new Router;
const PORT = 8080
const products = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'))

//Middlewares
app.use('/', router)
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, "views", "ejs"))
app.set('view engine', 'ejs')


router.get('/', (req, res, next)=>{
    res.render('index', {products})
})

app.post('/productos', (req, res, next)=>{
    const newProd = req.body
    console.log(req.body)
    newProd.id = products.length + 1
    products.push(newProd)
    fs.writeFileSync('./productos.json', JSON.stringify(products))
    res.redirect('/')
})

router.put('/', (req, res, next)=>{
    const {prod_id, new_price} = req.query
    if(prod_id > 0 && prod_id <= products.length){
        const item = products.find(e => e.id == prod_id)
        item.price = new_price
        fs.writeFileSync('./productos.json', JSON.stringify(products))
        return res.send(`El producto ${item.name} fué actualizado. Nuevo precio: $${item.price}`)
    }
    return res.send(`Error: el id '${prod_id}' no se corresponde a ningun producto`)
})

router.delete('/', (req, res, next)=>{
    const reqProd = req.query
    if(reqProd.id > 0 && reqProd.id <= products.length){
        const item = products.find(e => e.id == prod_id)
        products.splice(products.indexOf(item),1)
        fs.writeFileSync('./productos.json', JSON.stringify(products))
        return res.send(`El producto con id ${reqProd.id} fue exitosamente eliminado`)
    }
    return res.send(`Error al eliminar producto: el id '${reqProd.id}' no se corresponde a ningun producto`)
})

app.listen(PORT, ()=>{
    console.log(`Escuchando desde http://localhost:${PORT}`)
})