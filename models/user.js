import mongoose from 'mongoose'
import { UserSchema } from './schemas/user.js'

const usersSchemaModel = new mongoose.Schema(UserSchema)

export const UserModel = new mongoose.model('users', usersSchemaModel)