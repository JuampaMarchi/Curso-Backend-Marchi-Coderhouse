const bcrypt = require('bcrypt')

const encrypt = (value) => bcrypt.hashSync(value, 10)

const checkValue = (value, encValue) => bcrypt.compare(value, encValue)

module.exports = { encrypt, checkValue }