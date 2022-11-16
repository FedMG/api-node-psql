import userConnection from './routes/user-connection.js'
import initializePassport from './passportConfig.js'

import morgan from 'morgan'
import session from 'express-session'
import flash from 'express-flash'
import passport from 'passport'
import express from 'express'
const app = express()

initializePassport(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")




app.use(
    session({
    // Key we want to keep secret which will encrypt all of our information
    secret: 'secret',
    // Should we resave our session variables if nothing has changes which we dont
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false }
  }))
  
app.use(passport.initialize())
app.use(passport.session())

wwww

app.use(morgan('dev'))
app.use(flash())

app.use('/', userConnection)

const PORT = process.env.PORT || 0
app.listen(PORT, () => console.log(`App listen in port ${PORT}`))