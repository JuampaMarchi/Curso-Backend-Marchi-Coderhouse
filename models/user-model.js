const mongoose = require('mongoose')
const UserSchema = require('./schemas/user-schema')

const usersSchemaModel = new mongoose.Schema(UserSchema)

const UserModel = new mongoose.model('users', usersSchemaModel)

module.exports = UserModel