const { createTransport } = require('nodemailer')
const { mailer } = require('../../config/index')

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: mailer.user,
        pass: mailer.password,
    },
    
});

module.exports = transporter