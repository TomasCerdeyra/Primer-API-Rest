import { validationResult } from "express-validator"

const expressValidation = (req, res, next) => {
    const errors = validationResult(req)

    //Si errors no esta vacion
    if (!(errors.isEmpty())) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

export default expressValidation