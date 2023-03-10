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
        //Como primer parametro pasamos la info que queremos enviar en el token y como 
        //segundo mandamos la clave secreta creada
        const token = jwt.sign({ uid: user._id }, process.env.JWT - PASS)

        res.json({ ok: 'register' })
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
        const refreshTokenCookie = req.cookies.refreshToken
        if (!refreshTokenCookie) throw new Error('No existe el token')

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_PASS_REFRESH)
        const { token, expiresIn } = generateToken(uid)

        res.json({ token, expiresIn })
    } catch (error) {
        console.log(error);
        const TokenVerficationErrors = {
            "invalid signature": "La furma de JWT no es valida",
            "jwt expired": "JWT expírado",
            "invalid token": "Token no valido",
            "jwt malformed": "JWT formato no valido",
            "No Bearer": "Utiliza formato Bearer"
        }
        res.status(401).json({ error: TokenVerficationErrors[error.message] })
    }
}


const logout = (req, res) => {
    //Destruimos la cookie
    res.clearCookie('refreshToken')
    res.json({ok: true})
}

export {
    login,
    register,
    refreshToken,
    logout
}