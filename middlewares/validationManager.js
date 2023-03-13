import axios from "axios"
import { validationResult, body, param } from "express-validator"

export const expressValidation = (req, res, next) => {
    const errors = validationResult(req)

    if (!(errors.isEmpty())) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

export const bodyRegisterValidator = [
    body('email', "Formato email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Formato de contrasela incorrecta")
        .trim()
        .isLength({ min: 6 })
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('No coinciden las contraseñas')
            }
            return value
        }),
    expressValidation
]

export const bodyLoginValidator = [
    body('email', "Formato email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Formato de contrasela incorrecta").trim().isLength({ min: 5 }),
    expressValidation
]


export const bodyLinkValidator = [
    body("longLink", "Formato link incorrecto").trim().notEmpty()
        .custom(async value => {
            try {

                if (!value.startsWith('https://')) {
                    value = 'https://' + value
                }

                console.log(value);
                //Si la peticion pasa quiere decir q es una url sino va al cath
                await axios.get(value)
                return value
            } catch (error) {
                console.log(error);
                throw new Error("No existe longLink 404")
            }
        }),
    expressValidation
]

export const paramsLinkValidator = [
    param('id', 'Formato id no valido')
        .trim()
        .notEmpty()
        .escape(),
    expressValidation
]