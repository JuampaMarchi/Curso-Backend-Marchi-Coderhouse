const expressJwt = require('express-jwt')
const pino = require('../logger/pino')
const { config } = require('../../config')

class AuthJwt {
    async auth(){
        try {
            const secret = config.authJWTService
            return expressJwt({
                secret,
                algorithms: ['HS256'],
                isRevoked: this.isRevoked, 
            })
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }

    async isRevoked(req, payload, done){
        try {
            if(req.url == '/user' || req.url == '/user/:id'){
                !payload.role == 'admin' ? done(null, true) : done()
            }
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new AuthJwt()
