import mongoose from "mongoose";
import { cartSchema } from "./schemas/cart.js";

const cartSchemaModel = new mongoose.Schema(cartSchema)
export const CartModel = new mongoose.model(cartSchemaModel)

