const moment = require('moment')
const pino = require('../logger/pino')

class Moment {
    async date(){
        try {
            return moment().format('DD/MM/YYYY HH:mm:ss')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new Moment()