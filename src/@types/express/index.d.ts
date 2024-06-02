import { Types } from 'mongoose';
export {}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: Types.ObjectId;
                role: String
            };
        }
    }
}