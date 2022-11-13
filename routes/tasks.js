import express from 'express'

import { getAllCharacters, createCharacter } from '../controllers/tasks.js'
const router = express.Router()

router.route('/').get(getAllCharacters).post(createCharacter)

export default router
