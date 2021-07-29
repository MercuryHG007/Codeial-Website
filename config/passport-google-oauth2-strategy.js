const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID: "535361924792-g71rhcvhgh3vglpdevg8en56d1eekl9g.apps.googleusercontent.com",
        clientSecret: "ySG_OjO_PsiSzY2wPDxJTGtu",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        // Find a User
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google Strategy Passport ',err); 
                return;
            }
            console.log(profile);

            if(user){
                // if user found, set user as req.user
                return done(null, user);
            }
            else{
                // if user not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err, user){
                    if(err){
                        console.log('Error in google Strategy Passport ',err); 
                        return;
                    }
                    else{
                        return done(null, user);
                    }
                });
            }
        });
    }
));

module.exports = passport;