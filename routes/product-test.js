import { Router } from "express";
import faker from 'faker'

faker.locale = 'es'
export const testRouter = new Router()

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

