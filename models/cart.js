import {Schema, model} from "mongoose";
import { cartSchema } from "./schemas/cart.js";

const cartSchemaModel = new Schema(cartSchema)
export const CartModel = new model(cartSchemaModel)

