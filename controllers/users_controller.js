// RENDER USERPROFILE PAGE
module.exports.profile = function(req,res){
    return res.render('userProfile',{
        title: "User Profile"
    });
}

// RENDER SIGN UP PAGE
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

// RENDER SIGN IN PAGE
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

// GET THE SIGN UP DATA
module.exports.create = function(req,res){
    // todo
}

// SIGN IN AND CREATE A LOGIN SESSION
module.exports.createSession = function(req,res){
    // todo
}