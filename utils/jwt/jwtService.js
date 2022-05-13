const jwt = require('jsonwebtoken')
const pino = require('../logger/pino')
const { config } = require('../../config/index')

class JWT {
    async generate(payloadTokenData){
        try {
            console.l
            return await jwt.sign(payloadTokenData, config.authJWTService, {
                expiresIn: config.expireTimeToken * 1000 || 600000,
                algorithm: config.algorithmToken || 'HS256'
            })
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async verify(token){
        try {
            return await jwt.verify(token, config.authJWTService, {
                algorithm: [config.algorithmToken]
            })
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async decode(token){
        try {
            return await jwt.decode(token, config.authJWTService, {
                algorithm: [config.algorithmToken]
            })
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new JWT()