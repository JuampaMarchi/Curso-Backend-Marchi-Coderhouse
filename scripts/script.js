const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')
let {Router} = express;
let router = new Router;
const PORT = 8080
const products = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'))

//Middlewares
const ruta = path.join(__dirname, "../public", "html")
app.use("/", express.static(ruta))
app.use(express.json())
app.use(express.urlencoded({extended: true}));


router.get('/:id', (req, res, next)=>{
    const reqId = req.params
    if(reqId.id > 0 && reqId.id <= products.length){
        const item = products.find(e => e.id == reqId.id)
        return res.json(item)
    }
    return res.send(`El id: ${reqId.id} no existe en nuestra base de datos`)
})

router.get('/', (req, res, next)=>{
    const reqId = req.query
    if(reqId.id > 0 && reqId.id <= products.length){
        const item = products.find(e => e.id == reqId.id)
        return res.json(item)
    } else {
        if(reqId.id == undefined){
            return res.json(products)
        }
    }
    return res.send(`El query id: ${reqId.id} no existe en nuestra base de datos`)
})

router.post('/', (req, res, next)=>{
    const newProd = req.body
    newProd.id = products.length + 1
    products.push(newProd)
    fs.writeFileSync('./productos.json', JSON.stringify(products))
    res.send(`Se cargo el producto ${newProd.name.toUpperCase()} con el id: ${newProd.id}`)
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

app.use('/productos', router)

app.listen(PORT, ()=>{
    console.log(`Escuchando desde http://localhost:${PORT}`)
})