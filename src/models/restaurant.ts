import mongoose, { Document, Schema } from 'mongoose';

export interface IRestaurant extends Document {
    name: string;
    phoneNumber: string;
    email: string;
}

const RestaurantSchema: Schema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true }
});

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
