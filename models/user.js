const mongoose = require('mongoose')
const UserSchema = require('./schemas/user')

const usersSchemaModel = new mongoose.Schema(UserSchema)

const UserModel = new mongoose.model('users', usersSchemaModel)

module.exports = UserModel