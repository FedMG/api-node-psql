import { pool } from '../db/pool.js'
import { createCustomError } from '../errors/custom-error.js'
import { isStringWithLength } from '../utils/validators.js'
import { errorListener } from '../middlewares/error-listener.js'

export const getAllCharacters = errorListener(async (_, res) => {
  const table = await pool.query('SELECT * FROM dbz_characters')
  res.status(200).json(table.rows)
})

export const createCharacter = errorListener(async (req, res, next) => {
  const { name } = req.body

  if (isStringWithLength(name)) {
    return next(createCustomError('Name must be a string and less than 10 characters long', 500))
  }

  const table = await pool.query(
    'INSERT INTO dbz_characters (name) VALUES($1)',
    [name]
  )
  res.status(200).json(table.rows)
})

export const getCharacter = errorListener(async (req, res, next) => {
  const { id } = req.params
  const table = await pool.query('SELECT * FROM dbz_characters WHERE id = $1', [id])

  if (!table.rows.length) {
    return next(createCustomError(`There is not character with id : ${id}`, 404))
  }
  res.status(200).json(table.rows)
})

export const updateCharacter = errorListener(async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body

  if (isStringWithLength(name)) {
    return next(createCustomError('Name must be a string and less than 10 characters long', 500))
  }

  const table = await pool.query('UPDATE dbz_characters SET name = $2 WHERE id = $1 RETURNING *', [id, name])

  if (!table.rows.length) {
    return next(createCustomError(`There is not character with id: ${id}`, 404))
  }

  res.status(200).json(table.rows)
})

export const deleteCharacter = errorListener(async (req, res, next) => {
  const { id } = req.params
  const table = await pool.query('DELETE FROM dbz_characters WHERE id = $1', [id])

  if (!table.rowCount) {
    return next(createCustomError(`There is not character with id : ${id}`, 404))
  }

  res.status(200).json(table.rows)
})
