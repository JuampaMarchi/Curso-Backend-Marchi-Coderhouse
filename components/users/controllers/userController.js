const userServices = require('../services/userService')
const pino = require('../../../utils/logger/pino')
const mailer = require('../../../utils/nodemailer/nodemailer')

class UserController {
    async get(req, res){
        try {
            const response = await userServices.findAll()
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async getOne(req, res){
        try {
            const { id } = req.params
            const response = await userServices.findById(id)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async create(req, res){
        try {
            const response = await userServices.insert(req.body)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async update(req, res){
        try {
            const { id } = req.params
            const response = await userServices.update(id, req.body)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }async delete(req, res){
        try {
            const { id } = req.params
            const response = await userServices.delete(id)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new UserController()