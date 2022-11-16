export const isUserAuthenticated = (req, res, next) => {
   console.log('is1: ', req.isAuthenticated())
  if (req.isAuthenticated()) {
   console.log('redirect 1')
    
    return res.redirect('/users/dashboard')
  }
  console.log('next 1')
  next()
}

export const userIsNotAuthenticated = (req, res, next) => {
   console.log('is2: ', req.isAuthenticated())
   
   if (req.isAuthenticated()) {
       console.log('next 2')
     return next()
   }
   console.log('redirect 2')
   res.redirect('/users/login')
}