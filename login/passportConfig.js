import { pool } from "./dbConfig.js";
import { errorListener } from "./middlewares/error-listener.js";

import bcrypt from "bcrypt";
import LS from "passport-local";
const LocalStrategy = LS.Strategy;

const setSerialize = (user, done) => {
  console.log("user.id: ", user.id);
  done(null, user.id);
};

const setDeserialize = (id, done) => {
  console.log("Deserialize: ", { id, done });
  pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then(({ rows }) => done(null, rows[0]))
    .catch((error) => console.log(error));
};

const getUserByEmail = errorListener(async (email) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows;
});

const authenticateUser = errorListener(async (email, password, done) => {
  const user = await getUserByEmail(email);
  
  console.log(user, 'user', !user)
  if (!user) {
    return done(null, false, { message: "Email is not registered" });
  }
  if (await bcrypt.compare(password, user.password)) {
    console.log('match')
    return done(null, user);
  }
  console.log('password incorrect')
  return done(null, false, { message: "Password incorrect" });
});



const initialize = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser(setSerialize);
  passport.deserializeUser(setDeserialize);
};

export default initialize;

/* 


  if (rows.length) {
    const { password: db_password } = rows[0];
    const isMatch = await bcrypt.compare(password, db_password);
    console.log("isMath", isMatch);

    if (isMatch) {
      return done(null, rows[0]);
    } else {
      return done(null, false, { message: "Password incorrect" });
    }
  }
  return done(null, false, { message: "Email is not registered" });


*/
