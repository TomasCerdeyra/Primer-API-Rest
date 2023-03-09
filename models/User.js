import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const collName = 'User'

const userScherma = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
})

//Antes de que se envie el modelo hacemos esto
//"save es el evento que queremos tomar"
userScherma.pre("save", async function (next) {
    const user = this;
    if (!user.isModified('password')) return next()

    try {
        const salt = bcryptjs.genSaltSync(10)
        user.password = await bcryptjs.hashSync(user.password, salt)
        next()
    } catch (error) {
        console.log(error);
        console.log('fallo hash contra');
    }
})

//Metodos para el modelo de usuarios
userScherma.methods.comparePassword = async function (frontPassword) {
    return await bcryptjs.compare(frontPassword, this.password)
}

const ModelUser = mongoose.model(collName, userScherma)

export default ModelUser