const transporter = require('../../config/mail')
const pino = require('../logger/pino')
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
            pino.info(response)
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
    async orderAlert(data){
        try {
            const itemLine = () => {
                for (const item of data.products) {
                    return `<li>Producto: ${item.name} - Cantidad: ${item.qty} - Precio: ${item.price}`
                }
            }
            const option = {
                from: 'Admin',
                to: mailer.user,
                subject: 'Nueva Orden',
                html: `
                <div>
                    <p>Estimado cliente, gracias por su compra. Le enviamos aqui el detalle de su pedido</p>
                    <ul>
                       ${itemLine()} 
                    </ul>
                </div>
                `
            }
            const response = await transporter.sendMail(option)
            pino.info(response)
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
}

module.exports = new MailService()
