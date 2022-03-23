const { inspect } = require('util')

const printObj = (obj) => {
    console.log(inspect(obj, false, 10, true))
}

module.exports = printObj