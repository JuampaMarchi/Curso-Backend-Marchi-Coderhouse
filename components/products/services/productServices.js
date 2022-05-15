const ProductModel = require('../../../models/product-model')
const pino = require('../../../utils/logger/pino')
const jwtServices = require('../../../utils/jwt/jwtService')
const { CRUD, connection } = require('../../../config/db')

class Product {
    static client
    constructor(){
        if(Product.client) return Product.client
        CRUD()
        Product.client = connection
        this.client = Product.client
        this.collection = ProductModel
    }
    async create(data){
        try {
            await this.collection.create(data)
            pino.info(`Producto creado con exito`)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async getAll(){
        try {
            const products = await this.collection.find({})
            return products
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async getOne(id){
        try {
            const product = await this.collection.findOne({_id: id})
            return product
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async update(id, data){
        try {
            const product = await this.collection.findOne({_id: id})
            if(!product) throw new Error(`El producto con id ${id} no existe`)
            await this.collection.update({_id: id}, data)
            pino.info(`Producto actualizado con exito`)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async delete(id){
        try {
            const product = await this.collection.findOne({_id: id})
            if(!product) throw new Error(`El producto con id ${id} no existe`)
            await this.collection.delete({_id: id})
            pino.info(`Producto eliminado con exito`)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new Product()