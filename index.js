
const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);

// for queries from form in views
app.use(express.urlencoded());

// to encrypt the cookie
app.use(cookieParser());

// include static files like css js and all
app.use(express.static('./assets'));

// include the layout
app.use(expressLayouts);

// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
// session setup
app.use(session({
    name: 'codeial',
    // TODO CHANGE SECRET BEFORE DEPLOY 
    secret: 'blahsomething', //to encrypt the data
    saveUninitialized: false,
    resave: false,
    cookie: {
        // Age of cookie calculated in milisecond
        maxAge: (1000*60*100) 
    },
    // used to store the session info even after server restarts
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'Connect-mongodb Setup OK');
        }
    )
}));

// use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is Up and Running on port: ${port}`);
})
