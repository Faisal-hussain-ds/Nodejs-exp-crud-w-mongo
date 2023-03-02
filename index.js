const http = require("http");
// const userController = require('./app/controllers/userController');

const app = require("./app");
const server = http.createServer(app);



const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;


const passport = require('passport');
const cookieSession = require('cookie-session');
require('./googlePassport');
  
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

    
  
app.get('/google', (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>")
});
  
// Auth 
app.get('/auth' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));
  
// Auth Callback
app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));
  
// Success 
app.get('/auth/callback/success' , (req , res) => {
    console.log('this is my request',req.user);
    if(!req.user)
        res.redirect('/auth/callback/failure');
    res.send("Welcome " + req.user.email);

    
});
  
// failure
app.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
})



// user model crud start here

    // Create a new user
    // app.post('/user', userController.create);



// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});