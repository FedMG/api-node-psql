import express from 'express'
const router = express.Router()

import { getHome, getLogin, getDashboard, getLogOut } from '../controllers/user-connection.js'
import { getRegister, createNewUser } from '../controllers/register.js'
import { setAuthentication } from '../passport/setAuthentication.js'
import { isUserAuthenticated, userIsNotAuthenticated } from '../middlewares/check-user-authentication.js'


router.route('/').get(getHome)
router.route('/user/register').get(isUserAuthenticated, getRegister).post(createNewUser)
router.route('/user/login').get(isUserAuthenticated, getLogin).post(setAuthentication)
router.route('/user/logout').get(getLogOut)
router.route('/user/dashboard').get(userIsNotAuthenticated, getDashboard)

export default router
