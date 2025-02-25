import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/products.interface';

const ProductSchema: Schema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  isActive:{type: Boolean,required: true, default: true}
},);

export const ProductModel = model<Product & Document>('Products', ProductSchema);
