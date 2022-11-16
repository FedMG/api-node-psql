import { errorListener } from "../middlewares/error-listener.js";
import { getUserByEmail} from ' ../utils/query.js' 

import bcrypt from "bcrypt";

export const authenticateUser = errorListener(async (email, password, done) => {
  const user = await getUserByEmail(email);
  
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
