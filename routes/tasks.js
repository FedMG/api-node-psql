import express from 'express'

import { getAllCharacters, createCharacter, getCharacter } from '../controllers/tasks.js'
const router = express.Router()

router.route('/').get(getAllCharacters).post(createCharacter)
router
  .route("/:id")
  .get(getCharacter)

export default router
