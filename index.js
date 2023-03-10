import express from 'express'
import 'dotenv/config'
import './database/connectMD.js'
import cookieParser from 'cookie-parser'
//Routes
import authRouter from './routes/authRoute.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
//SOlo para prueba
app.use(express.static('public'))

//routes
app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
    console.log("http://localhost:8080");
})
