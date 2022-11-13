import morgan from 'morgan'
import cors from 'cors'

import express from 'express'
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))



const PORT = process.env.PORT
app.listen(PORT, console.log(`App listen in port ${PORT}`))
