const moment = require('moment')
const pino = require('../logger/pino')

class Moment {
    async date(){
        try {
            const newDate = moment().format('DD/MM/YYYY HH:mm:ss')
            return newDate
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new Moment()