const OrderModel = require('../../../models/order-model')
const pino = require('../../../utils/logger/pino')
const { CRUD, connection } = require('../../../config/db')

class Order {
    static client
    constructor(){
        if(Order.client) return Order.client
        CRUD()
        Order.client = connection
        this.client = Order.client
        this.collection = OrderModel
    }
    async get(){
        try {
            const order = await this.collection.find({})
            if(!order) throw new Error(`No existen ordenes en la base de datos`)
            return order
        } catch (error) {
            pino.error(`Tuvimos el siguiente error`)
        }
    }
    async getOne(id){
        try {
            const order = await this.collection.findOne({order_id: id})
            if(!order) throw new Error(`La orden con id ${id} no existe`)
            return order
        } catch (error) {
            pino.error(`Tuvimos el siguiente error`)
        }
    }
    async getUserOrders(email){
        try {
            const order = await this.collection.findOne({email})
            if(!order) throw new Error(`La orden con id ${id} no existe`)
            return order
        } catch (error) {
            pino.error(`Tuvimos el siguiente error`)
        }
    }
    async create(user, items){
        try {
            let id = 1
            const exist = await this.collection.find({})
            if(exist.length > 0) id = exist.reduce((p, c) => p != c.id ? p : p + 1, 1)
            await this.collection.create({order_id: id, email: user.email, status: 'creada', products: items})
            pino.info(`Orden nro. ${id} generada con exito`)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error`)
        }
    }
    async closeOrder(id){
        try {
            const order = await this.collection.findOne({order_id: id})
            if(!order) throw new Error(`La orden con id ${id} no existe`)
            await this.collection.findOneAndRemove({order_id: id})
            pino.info(`Orden nro. ${id} generada con exito`)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error`)
        }
    }
    async update(){
        try {
            const order = await this.collection.findOne({order_id: id})
            if(!order) throw new Error(`La orden con id ${id} no existe`)
            await this.collection.update({order_id: id}, data)
            pino.info(`Orden nro. ${id} generada con exito`)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error`)
        }
    }
}

module.exports = new Order()