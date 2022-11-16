import passport from "passport";

export const setAuthentication = passport.authenticate("local", {
  successRedirect: "/users/dashboard",
  failureRedirect: "/users/login",
  failureFlash: true,
});


// export const setAuthentication2 = (req, res) => {
//   req.session.save(() => {
//     res.redirect("/users/dashboard");
//   });
// };

// export const setAuthentications = (req, res, next) => {
//   passport.authenticate("local")(req, res, function () {
//     if (!req.user) {
//       console.log("User not found!");
//     } else {
//       console.log("isAuth?: ", req.isAuthenticated());
//       console.log("user?: ", req.user);

//       // Explicitly save the session before redirecting!
//       req.session.save(() => {
//         res.redirect("/");
//       });
//       // res.redirect("/")
//       console.log("signed in");
//     }
//   });
// };
