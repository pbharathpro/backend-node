import { model, Schema, Document } from 'mongoose';
import { Order } from '@interfaces/orders.interface';

const OrderSchema: Schema = new Schema({
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    quantity:{type:Number,required : true},
    totalPrice: { type: Number },
  
},);

export const OrderModel = model<Order & Document>('Orders', OrderSchema);
