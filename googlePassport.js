
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
  
passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID:"696640893632-vtcemvnbabi9a53rj1bmhkpohq9j3rft.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"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", // Your Credentials here.
    callbackURL:"http://127.0.0.1:4001/google/callback",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));