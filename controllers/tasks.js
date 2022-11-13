import { pool } from '../db/pool.js'
import { getTableDetails } from '../utils/table-details.js'

export const getAllCharacters = async (_, res) => {
  try {
    const { result } = await getTableDetails('SELECT * FROM dbz_characters')
    res.status(200).json(result.rows)
  } catch (error) {
    console.log(error)
  }
}

export const createCharacter = async (req, res) => {
  try {
    const { name } = req.body
    const { rows } = await getTableDetails('SELECT * FROM dbz_characters')

    const id = rows.length + 1

    const result = await pool.query(
      'INSERT INTO dbz_characters(id, name) VALUES($1, $2)',
      [id, name]
    )

    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).send(error)
  }
}