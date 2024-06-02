import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
    menuItem: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    items: IOrderItem[];
    total: number;
    status: string;
    createdAt: Date;
}

const OrderSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: { type: String, default: 'placed' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
