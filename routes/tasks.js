import express from 'express'

import { getAllCharacters, createCharacter, getCharacter, updateCharacter, deleteCharacter } from '../controllers/tasks.js'
const router = express.Router()

router.route('/').get(getAllCharacters).post(createCharacter)
router
  .route("/:id")
  .get(getCharacter)
  .patch(updateCharacter)
  .delete(deleteCharacter)

export default router
