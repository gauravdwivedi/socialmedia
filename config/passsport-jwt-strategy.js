//first passport
const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
//moudle to extract jwt from the header part
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');
//we need user for authentication
const User = require('../models/user');



let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:   env.jwt_secret
           }

passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
        if (err) { console.log('Error in finding user in JWT'); return; }
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport;