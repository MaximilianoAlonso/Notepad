const express = require('express');
const router = express.Router();
const passport = require('passport');
const {loginGoogle} = require("../controllers/authController")
const db = require("../database/models")

passport.serializeUser((user, done)=> done(null,user))
passport.deserializeUser((user, done)=> done(null,user))

/* AUTH*/
router
      .get("/login/google", passport.authenticate("google"))
      .get("/google/callback", passport.authenticate("google", {failureRedirect: "/user/login"}), loginGoogle);
      



module.exports = router;
