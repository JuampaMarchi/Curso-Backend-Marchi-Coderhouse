const transporter = require('./mailer_config')
const pino = require('../logger/pino')
const { mailer } = require('../../config/index')

class MailService {
    async registerAlert(user){
        try {
            const option = {
                from: 'Admin',
                to: user.email,
                subject: 'Nueva Alta',
                text: `El usuario ${user.username} se ha registrado en la plataforma`
            }
            const response = await transporter.sendMail(option)
            return response
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
    async registerAlertAdmin(user){
        try {
            const option = {
                from: 'Server',
                to: mailer.admin_user,
                subject: 'Nueva Alta',
                text: `Notificacion: El usuario ${user.username} se ha registrado en la plataforma`
            }
            const response = await transporter.sendMail(option)
            return response
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
    async orderAlert(user, data){
        try {
            let items = ''
            data.products.forEach(e => {
                items += `<li>Producto: ${e.name} - Cantidad: ${e.qty} - Precio: ${e.price}</li><br>`
            })
            const option = {
                from: 'Admin',
                to: user.email,
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
            const response = await transporter.sendMail(option)
            return response
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
    async orderAlertAdmin(user, data){
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
                    <p>Notificacion de nueva orden del usuario ${user.name}. Detalle:</p>
                    <ul>
                       ${items} 
                    </ul>
                    <p>Saludos</p>
                </div>
                `
            }
            const response = await transporter.sendMail(option)
            return response
        } catch (error) {
            pino.error(`Tuvimos este error: ${error}`)
        }
    }
}

module.exports = new MailService()
