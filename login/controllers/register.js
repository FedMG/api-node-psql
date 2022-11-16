import { pool } from "../dbConfig.js";
import { validateDataUser } from "../validators/user-connection.js";
import { getUserByEmail } from "../utils/query.js";
import { errorListener } from "../middlewares/error-listener.js";
import bcrypt from "bcrypt";

export const getRegister = (req, res) => {
  res.render("register.ejs");
};

const encryptPassword = errorListener(async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    //   RETURNING id, password`,
    [name, email, hashedPassword]
  );
});

export const createNewUser = errorListener(async (req, res) => {
  let { name, email, password, password2 } = req.body;

  const errors = validateDataUser({ name, email, password, password2 });
  if (errors) {
    res.render("register.ejs", { errors });
  }

  const user = await getUserByEmail(email);
  if (!user) {
    const errors = [{ message: "Email already registered" }];
    return res.render("register.ejs", { errors });
  }

  encryptPassword(name, email, password)
    .then(() => {
      req.flash("success_msg", "You are now registered. Please log in");
      res.redirect("/user/login");
    })
    .catch((error) => console.log(error));
});
