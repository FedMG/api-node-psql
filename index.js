import morgan from 'morgan'
import cors from 'cors'
import express from 'express'

import tasks from './routes/tasks.js'
import notFound from './middlewares/not-found.js'
import errorHandler from './middlewares/error-handler.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/characters', tasks)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, console.log(`App listen in port ${PORT}`))
