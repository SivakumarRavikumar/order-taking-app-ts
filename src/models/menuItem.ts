import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    restaurant: mongoose.Schema.Types.ObjectId;
}

const MenuItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }
});

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
