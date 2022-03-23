const connections = require('./services/container')

const mysql = new connections.ProductContainer()

const sqlite = new connections.MessageContainer()

module.exports = { mysql, sqlite }