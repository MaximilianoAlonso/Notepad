const express = require('express');
const router = express.Router();
const { register, saveRegister, login, loadLogin, logOut} = require('../controllers/userController');

/* Validaciones y middlewares*/
const loginValidator = require("../validations/loginValidator")
const registerValidator = require("../validations/registerValidator")
const checkUserLog = require("../middlewares/checkUserLog")


/* GET users listing. */
router.get('/register', register)
      .post('/register', registerValidator, saveRegister)
      .get("/login",checkUserLog, login)
      .post("/login", loginValidator, loadLogin)
      .get("/logOut", logOut)
      
     

module.exports = router;
