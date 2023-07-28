 const passport = require("passport");
 const OAuth2Strategy = require("passport-google-oauth").OAuth2Strategy;

 const clientID = "520784497341-k4p164n2uj90oc9gjs6m936t5lfknkq0.apps.googleusercontent.com"
 const clientSecret = "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"
 const callbackURL = "https://notepad-1pwu.onrender.com/auth/google/callback"

 const strategyConfig = new OAuth2Strategy({
    clientID,
    clientSecret,
    callbackURL,
    scope: ["profile"]

 },(accessToken, refreshToken, profile, done) => {
    console.log(profile);

    done(null, profile)
 })
 module.exports = {
    loginGoogleInitialize: () => passport.use(strategyConfig)
}
        