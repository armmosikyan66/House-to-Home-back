import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: false
    },
    favorites: [{
        type: ObjectId, ref: "Products",
    }],
    role: {
        type: String,
        default: "user",
        enum: ["user", "local", "admin"]
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    }
}, {timestamps: true})

export default model("User", UserSchema);