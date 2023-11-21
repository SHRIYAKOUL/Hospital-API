/*
    This file sets up Passport.js for handling JWT authentication in our 
    application. It imports the necessary modules, defines options for the 
    JWT strategy, and sets up the JWT strategy with Passport.js.
*/
const passport = require('passport');

const Doctor = require('../models/doctor');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `secret`;

// Set up JWT Strategy with Passport.js
passport.use(
    new JwtStrategy(opts,function(jwt_playload, done){
        Doctor.findOne({ id: jwt_payload.id}, function(err,user){
            if(err){
                return done(err,false);

            }
            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        });
    })
);
// Export Passport instance
module.exports = passport;