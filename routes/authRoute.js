import { Router } from 'express'
import { login, register, refreshToken, logout } from '../controllers/authController.js'
import { body } from 'express-validator'
import expressValidation from '../middlewares/validationResult.js'

const authRouter = Router()

authRouter.post(
    '/register',
    [
        body('email', "Formato email incorrecto").trim().isEmail().normalizeEmail(),
        body('password', "Formato de contrasela incorrecta")
            .trim()
            .isLength({ min: 5 })
            .custom((value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error('No coinciden las contraseñas')
                }
                return value
            })
    ],
    expressValidation,
    register
);

authRouter.post('/login',
    [
        body('email', "Formato email incorrecto").trim().isEmail().normalizeEmail(),
        body('password', "Formato de contrasela incorrecta").trim().isLength({ min: 5 })
    ],
    expressValidation,
    login
);

authRouter.get('/refresh', refreshToken)

authRouter.get('/logout', logout)
export default authRouter