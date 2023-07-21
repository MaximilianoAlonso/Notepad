const express = require('express');
const router = express.Router();
const {user, register, saveRegister, login, createNote, saveNote, loadLogin, logOut} = require('../controllers/userController');

/* Validaciones y middlewares*/
const loginValidator = require("../validations/loginValidator")
const registerValidator = require("../validations/registerValidator")
const checkUserGuest = require("../middlewares/checkUserGuest")
const checkUserLog = require("../middlewares/checkUserLog")


/* GET users listing. */
router.get('/',checkUserGuest, user)
      .get('/register', register)
      .post('/register', registerValidator, saveRegister)
      .get("/login",checkUserLog, login)
      .post("/login", loginValidator, loadLogin)
      .get("/createNote", createNote )
      .post("/createNote", saveNote)
      .get("/logOut", logOut)
module.exports = router;
