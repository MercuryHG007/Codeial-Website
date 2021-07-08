const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err,user){
            if(err){
                console.log(`Error in finding user --> Passport: $(err)`);
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null,user);
        });
    }
));

// serializing the user to decide which key is to be kept in cookie
passport.serializeUser(function(user,done){
   done(null, user.id); 
});


// deserializing the user to decide which key is to be kept in cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        if(err){
            console.log(`Error in finding user --> Passport: $(err)`);
            return done(err);
        }
        return done(null, user);
    });
});

// check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if user is signed in, then pass request 
    // to next function i.e., controllers
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}

// we need to access the authenticated user in the views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session 
        // cookie and we are sending this to the locals for the views 
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;