import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem extends Document {
    menuItem: mongoose.Schema.Types.ObjectId;
    quantity: number;
    user: mongoose.Schema.Types.ObjectId;
}

const CartItemSchema: Schema = new Schema({
    menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<ICartItem>('CartItem', CartItemSchema);
