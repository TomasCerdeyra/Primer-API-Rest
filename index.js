import express from 'express'
import 'dotenv/config'
import './database/connectMD.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
//Routes
import authRouter from './routes/authRoute.js'
import linkRouter from './routes/linkRoute.js'
import redirectRouter from './routes/redirectRoute.js'
const app = express()

//lISTA DE DOMINIOS QUE PERMITO USAR PARA LOS CORS
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

//confing cors
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin)
            }
            return callback("Error de CORS origin: " + origin + " No autorizado")
        }
    })
)

app.use(express.json())
app.use(cookieParser())
//SOlo para prueba
app.use(express.static('public'))

//routes
app.use('/', redirectRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
})
