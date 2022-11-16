export const getHome = (req, res) => {
  res.render("index.ejs");
};

export const getLogin = (req, res) => {
  res.render("login.ejs");
};


export const getLogOut = (req, res) => {
  req.logout();
  res.render("index", { message: "You have logged out successfully" });
}

export const getDashboard = (req, res) => {  
  console.log('isUser? ', req.body?.user)
  console.log('isAuth? ', req.isAuthenticated());
  res.render("dashboard.ejs", { user: req.body?.user });
};
