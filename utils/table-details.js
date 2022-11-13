import { pool } from '../db/pool.js'

export const getTableDetails = async (command) => {
  const table = await pool.query(command)
  const rows = table.rows
  return {
    table,
    rows
  }
}
