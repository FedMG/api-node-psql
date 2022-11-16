import {authenticateUser } from './authenticateUser.js'
import { serialize, deserialize } from './serializers.js'

import LS from "passport-local";
const LocalStrategy = LS.Strategy;



const initialize = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
};

export default initialize;