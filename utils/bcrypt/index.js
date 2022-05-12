const bcrypt = require('bcrypt')
const pino = require('../logger/pino')
const { config } = require('../../config/index')

class Bcrypt {
    async compare(pass1, pass2){
        try {
            return await bcrypt.compare(pass1, pass2)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async encrypt(plainPass){
        try {
            return await bcrypt.hash(plainPass, config.saltCrypt)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new Bcrypt()