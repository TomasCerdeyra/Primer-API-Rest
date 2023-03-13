import ModelUser from "../models/User.js"
import jwt from 'jsonwebtoken'
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

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
        const { token, expiresIn } = generateToken(user._id)
        generateRefreshToken(user.id, res)

        res.status(201).json({ token, expiresIn })
    } catch (error) {
        console.log({ msg: error.message });

        if (error.message) return res.status(400).json({ error: error.message })

        return res.status(500).json({ error: "error del servidor" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await ModelUser.findOne({ email })
        if (!user) return res.status(403).json('No existe el usuario')

        const verificacionDePassword = await user.comparePassword(password)

        if (!verificacionDePassword) return res.status(403).json('Contraseña incorrecta')

        //generamos token jwt
        //Como primer parametro pasamos la info que queremos enviar en el token y como(En este caso en id del usuario) 
        //segundo mandamos la clave secreta creada
        const { token, expiresIn } = generateToken(user._id)

        //generamos el refreshToken
        generateRefreshToken(user.id, res)
        res.json({ token, expiresIn })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error del servidor" })
    }
}

const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid)

        res.json({ token, expiresIn })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error del servidor" })
    }
}


const logout = (req, res) => {
    //Destruimos la cookie
    res.clearCookie('refreshToken')
    res.json({ ok: true })
}

export {
    login,
    register,
    refreshToken,
    logout
}