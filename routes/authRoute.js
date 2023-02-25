import express from 'express'
import { login, register } from '../controllers/authController.js'
import { body } from 'express-validator'
import expressValidation from '../middlewares/validationResult.js'

const authRouter = express.Router()

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

authRouter.put('/login',
    [
        body('email', "Formato email incorrecto").trim().isEmail().normalizeEmail(),
        body('password', "Formato de contrasela incorrecta").trim().isLength({ min: 5 })
    ],
    expressValidation,
    login
);


export default authRouter