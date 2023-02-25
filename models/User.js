import mongoose from "mongoose";

const collName = 'user'

const userScherma = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    passwoerd: {
        type: String,
        required: true
    },
})

const UserModel = mongoose.model(collName, userScherma)

export default modelUser