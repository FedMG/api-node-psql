import morgan from 'morgan'
import cors from 'cors'
import express from 'express'

import tasks from './routes/tasks.js'
import notFound from './middlewares/not-found.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// routes
app.use('/characters', tasks)

app.use(notFound)

const PORT = process.env.PORT
app.listen(PORT, console.log(`App listen in port ${PORT}`))
