'use strict';
import passport from 'passport';
import { Strategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

passport.use(new Strategy(
    async (username, password, done) => {
      try {
        
        const user = await User.findOne({ username });

        if (!user || !(await bcryptjs.compare(password, user.password))) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        const strippedUser = user.toObject();
        delete strippedUser.password;

        return done(null, strippedUser, {message: 'Logged In Successfully'});
      }
      catch (err) {
        return done(err);
      }
    }));

passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwtsecret',
    },
    async (jwtPayload, done) => {
      try {
        
        const user = await User.findOne({ username: jwtPayload.username });

        if (user !== null) return done(null, user);

        return done(null, false);
      }
      catch (e) {
        return done(null, false);
      }
    },
));

export default passport;
