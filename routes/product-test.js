const { Router } = require('express')
const faker = require('faker')

faker.locale = 'es'

const testRouter = new Router()

testRouter.get('/', (req, res) => {
    const products = []
    for (let i = 0; i < 5; i++) {
        let item = {
            id: i+1,
            name: faker.commerce.productName(),
            price: faker.commerce.price()
        }
        products.push(item)
    }
    res.render('index', {products})
})

module.exports = testRouter

