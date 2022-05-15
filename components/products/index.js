const productController = require('./controllers/productController')
const { Router } = require('express')

const productRouter = new Router()

module.exports = app => {
    app.use('/products', productRouter)

    productRouter.get('/', productController.getAllView)
    productRouter.get('/list', productController.getAll)
    productRouter.post('/add', productController.create)
    productRouter.get('/:id', productController.getOne)
    productRouter.put('/:id', productController.update)
    productRouter.delete('/:id', productController.delete)
}
