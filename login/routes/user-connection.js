import express from 'express'
const router = express.Router()
import { getHome, getLogin, getRegister, getDashboard, setNewUser, getLogOut } from '../controllers/user-connection.js'
import { setAuthentication } from '../controllers/passport-authentication.js'
import { isUserAuthenticated, userIsNotAuthenticated } from '../middlewares/check-auth.js'


router.route('/').get(getHome)
router.route('/users/register').get(isUserAuthenticated, getRegister).post(setNewUser)
router.route('/users/login').get(isUserAuthenticated, getLogin).post(setAuthentication)
router.route('/users/logout').get(getLogOut)
router.route('/users/dashboard').get(userIsNotAuthenticated, getDashboard)

export default router
