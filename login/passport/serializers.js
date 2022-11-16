import { pool } from "../dbConfig.js";

export const serialize = (user, done) => {
  console.log("user.id: ", user.id);
  return done(null, user.id);
};

export const deserialize = (id, done) => {
  console.log("Deserialize: ", { id, done });
  pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then(({ rows }) => done(null, rows[0]))
    .catch((error) => console.log(error));
};
