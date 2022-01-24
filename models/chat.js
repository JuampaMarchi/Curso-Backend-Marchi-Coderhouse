import mongoose from 'mongoose'
import { chatSchema } from './schemas/chat.js'

const chatSchemaModel = new mongoose.Schema(chatSchema)

export const ChatModel = new mongoose.model('chat', chatSchemaModel)