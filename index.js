const express = require('express');
const env = require('./config/environment');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


//use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//passsport JWT 
const passportJwt = require('./config/passsport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');



// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');
app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}));

app.use(express.static(env.asset_path));
app.use(express.urlencoded());
app.use(cookieParser());
//make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change  the secret  before  deployment in production mode 
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        
            mongooseConnection: db,
            autoRemove:'disabled'
        
    },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

//setup current user usages
//whenever the app is getting initialized passport is getting initialized and this function is getting called
//it will check whether the session cookie is present or not
//this function is automatically is being called as a middleware

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);


//use express  router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
})
