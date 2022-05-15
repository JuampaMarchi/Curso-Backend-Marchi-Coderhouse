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
            return response
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
    async registerAlertAdmin(data){
        try {
            const option = {
                from: 'Server',
                to: mailer.admin_user,
                subject: 'Nueva Alta',
                text: `Notificacion: El usuario ${data.username} se ha registrado en la plataforma`
            }
            return response
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
    async orderAlert(data){
        try {
            let items = ''
            data.products.forEach(e => {
                items += `<li>Producto: ${e.name} - Cantidad: ${e.qty} - Precio: ${e.price}</li><br>`
            })
            const option = {
                from: 'Admin',
                to: mailer.user,
                subject: 'Nueva Orden',
                html: `
                <div>
                    <p>Estimado cliente, gracias por su compra. Le enviamos aqui el detalle de su pedido</p>
                    <ul>
                       ${items} 
                    </ul>
                    <p>Saludos</p>
                </div>
                `
            }
            return response
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
    async orderAlertAdmin(data){
        try {
            let items = ''
            data.products.forEach(e => {
                items += `<li>Producto: ${e.name} - Cantidad: ${e.qty} - Precio: ${e.price}</li><br>`
            })
            const option = {
                from: 'Server',
                to: mailer.admin_user,
                subject: 'Nueva Orden',
                html: `
                <div>
                    <p>Notificacion de nueva orden. Detalle:</p>
                    <ul>
                       ${items} 
                    </ul>
                    <p>Saludos</p>
                </div>
                `
            }
            return response
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
}

module.exports = new MailService()
