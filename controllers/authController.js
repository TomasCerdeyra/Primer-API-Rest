import ModelUser from "../models/User.js"
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    const { email, password } = req.body
    console.log(email);
    try {
        const user = await ModelUser.findOne({ email })

        if (user) throw new Error('El usuario ya existe')
        /* const user = new ModelUser({ email, password })
        await user.save() */

        await ModelUser.create({ email, password })

        //Generamos token jwt
        //Como primer parametro pasamos la info que queremos enviar en el token y como 
        //segundo mandamos la clave secreta creada
        const token = jwt.sign({uid: user._id}, process.env.JWT-PASS)

        res.json({ ok: 'register' })
    } catch (error) {
        console.log({ msg: error.message });

        if (error.message) return res.status(400).json({ error: error.message })

        return res.status(500).json({error: "error del servidor"})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await ModelUser.findOne({ email })
        if(!user) return res.status(403).json('No existe el usuario')

        const verificacionDePassword = await user.comparePassword(password)

        if(!verificacionDePassword)return res.status(403).json('Contraseña incorrecta')
    
        //generamos token jwt
        //Como primer parametro pasamos la info que queremos enviar en el token y como(En este caso en id del usuario) 
        //segundo mandamos la clave secreta creada
        const token = jwt.sign({uid: user._id}, process.env.JWT_PASS)

        res.json({ ok: token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "error del servidor"})   
    }
}



export {
    login,
    register
}