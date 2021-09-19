import { Schema, model } from "mongoose";
import { BaseUser } from './interfaces/user.interface';

const UserSchema = new Schema<BaseUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    telephone: {
        type: String,
    }
});

export default model<BaseUser>("User", UserSchema);