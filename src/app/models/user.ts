import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
    },
    isPaid:{
        type: Boolean,
        default: false,
    }
})

export default mongoose.models.UserSchema || mongoose.model('UserSchema',userSchema)
