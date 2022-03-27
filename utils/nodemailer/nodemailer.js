const transporter = require('../../config/mail')
const { mailer } = require('../../config/index')

class MailService {
    async registerAlert(data){
        try {
            const option = {
                from: 'Admin',
                to: mailer.user,
                subject: 'Nueva Alta',
                text: `El usuario ${data.username} se ha registrado en la plataforma`
            }
            const response = await transporter.sendMail(option)
            console.log(response)
        } catch (error) {
            console.log(`Tuvimos este error: ${error}`)
        }
    }
}

module.exports = new MailService()
