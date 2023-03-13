import mongoose from "mongoose";

const collName = 'Link'

const linkSchema = new mongoose.Schema({
    longLink: {
        type: String,
        required: true,
        trim: true,
    },
    nanoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const ModelLink = mongoose.model(collName, linkSchema)

export default ModelLink