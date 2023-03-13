import { Router } from 'express'
import { login, register, refreshToken, logout } from '../controllers/authController.js'
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js'
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validationManager.js'

const authRouter = Router()

authRouter.post('/register', bodyRegisterValidator, register);

authRouter.post('/login', bodyLoginValidator, login);

authRouter.get('/refresh', requireRefreshToken, refreshToken)

authRouter.get('/logout', logout)
export default authRouter