import mongoose from "mongoose";
import { productSchema } from "./schemas/products.js";

const productSchemaModel = new mongoose.Schema(productSchema)
export const productos = new mongoose.model('productos', productSchemaModel)
