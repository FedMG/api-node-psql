import { pool } from '../db/pool.js'
import { getTableDetails } from '../utils/table-details.js'
import { createCustomError } from "../errors/custom-error.js"


export const getAllCharacters = async (_, res) => {
  try {
    const { table } = await getTableDetails('SELECT * FROM dbz_characters')
    res.status(200).json(table.rows)
  } catch (error) {
    console.log(error)
  }
}

export const createCharacter = async (req, res) => {
  try {
    const { name } = req.body
    const { rows } = await getTableDetails('SELECT * FROM dbz_characters')
    const id = rows.length + 1

    const table = await pool.query(
      'INSERT INTO dbz_characters(id, name) VALUES($1, $2)',
      [id, name]
    )
    res.status(200).json(table.rows)

  } catch (error) {
    res.status(500).send(error)
  }
}

export const getCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const table = await pool.query("SELECT * FROM dbz_characters WHERE id = $1", [id]);
    
    if (!table.rows.length) {
      return next(createCustomError(`There is not character with id : ${id}`, 404));
    }
    res.status(200).json(table.rows);
    
  } catch (error) {
    console.log(error);
  }
};


export const updateCharacter = async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body
  
  const table = await pool.query("UPDATE dbz_characters SET name = $2 WHERE id = $1 RETURNING *", [id, name]);
  
  if (!table.rows.length) {
    return next(createCustomError(`There is not character with id: ${id}`, 404))
  }
  
  res.status(200).json(table.rows)
}


export const deleteCharacter = async (req, res, next) => {
  const { id } = req.params
  
  const table = await pool.query("DELETE FROM dbz_characters WHERE id = $1 RETURNING *", [id]);
  console.log('delete table: ',table)

  if (!table.rows.length) {
    return next(createCustomError(`There is not character with id : ${id}`, 404))
  }
  res.status(200).json(table.rows)
}