import express from 'express'
import 'dotenv/config'
import './database/connectMD.js'
//Routes
import authRouter from './routes/authRoute.js'

const app = express()
app.use(express.json())

//routes
app.use('/api/v1', authRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
    console.log("http://localhost:8080");
})
