import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    profilePicUrl: {
        type: String,
        required: false,
    },
    clerkUserId: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps:true} );


// check if model already exists
if(mongoose.models["users"]) {
    delete mongoose.models["users"];
}

const User = mongoose.model("users", userSchema);
export default User;