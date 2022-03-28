const twilio = require('twilio')
const pino = require('../logger/pino')
const { mailer } = require('../../config/index')

const twilioClient = twilio(mailer.twilio_SID, mailer.twilio_TOKEN)

class MessageServer {
    async sendMessage(receiver){
        try {
            const response = twilioClient.messages.create({
                from: mailer.twilio_sender,
                to: receiver,
                body: 'Estimado cliente, gracias por compra. En breve nos comunicaremos con los detalles de su orden. Saludos.'
            })
            pino.info(response)
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
}

module.exports = new MessageServer()