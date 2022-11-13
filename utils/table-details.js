import { pool } from '../db/pool.js'

export const getTableDetails = async (command) => {
  const result = await pool.query(command)
  const rows = result.rows
  return {
    result,
    rows
  }
}
