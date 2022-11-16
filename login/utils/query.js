import { pool } from '../dbConfig.js'
import { errorListener } from '../middlewares/error-listener.js'

export const getUserByEmail = errorListener( async (email) => {
   const { rows } = await pool.query(
       "SELECT * FROM users WHERE email = $1",
        [ email ]
        );
  return rows[0]
})