import { pool } from "../dbConfig.js";
import { validateNewUser } from "../validators/user-connection.js";
import { errorListener } from '../middlewares/error-listener.js'
import bcrypt from "bcrypt";


export const getHome = (req, res) => {
  res.render("index.ejs");
};

export const getLogin = (req, res) => {
  res.render("login.ejs");
};

export const getRegister = (req, res) => {
  res.render("register.ejs");
};

export const getLogOut = (req, res) => {
  req.logout();
  res.render("index", { message: "You have logged out successfully" });
}


const checkAndSaveUser = async (name, email, password) => {
  try {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (rows.length) {
    const errors = [];
    errors.push({ message: "Email already registered" });
    return errors
        
  } else {
    pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password`,
       [name, email, hashedPassword]
    );
  }
  } catch (error) {
    console.log(error)
  }
}



export const setNewUser = (req, res) => {
  let { name, email, password, password2 } = req.body;

  const errors = validateNewUser({ name, email, password, password2 });
  if (errors) {
    res.render("register.ejs", { errors });
  }
  
  checkAndSaveUser(name, email, password).then((err) => {
    if (err) {
      return res.render("register.ejs", { err });
    }
    req.flash('success_msg', "You are now registered. Please log in")    
    res.redirect("/users/login")    
  })

};

export const getDashboard = (req, res) => {  
  console.log('isUser? ', req.user ?? false)
  console.log('isAuth? ', req.isAuthenticated());
  res.render("dashboard.ejs", { user: "Jhon" });
};
