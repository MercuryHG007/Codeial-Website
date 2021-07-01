const User = require('../models/user');

// RENDER USERPROFILE PAGE
module.exports.profile = function(req,res){
    return res.render('userProfile',{
        title: "User Profile"
    });
}

// RENDER SIGN UP PAGE
module.exports.signup = function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

// RENDER SIGN IN PAGE
module.exports.signin = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

// GET THE SIGN UP DATA
module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log(`Error in Finding the User: ${err}`);
            return
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log(`Error in Creating the User while Signing Up: ${err}`);
                    return
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

// SIGN IN AND CREATE A LOGIN SESSION
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}