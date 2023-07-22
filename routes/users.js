const express = require('express');
const router = express.Router();
const {notes, register, saveRegister, login, createNote, saveNote, loadLogin, logOut, detailNote,deleteNote,edit,update} = require('../controllers/userController');

/* Validaciones y middlewares*/
const loginValidator = require("../validations/loginValidator")
const registerValidator = require("../validations/registerValidator")
const checkUserGuest = require("../middlewares/checkUserGuest")
const checkUserLog = require("../middlewares/checkUserLog")


/* GET users listing. */
router.get('/',checkUserGuest, notes)
      .get('/register', register)
      .post('/register', registerValidator, saveRegister)
      .get("/login",checkUserLog, login)
      .post("/login", loginValidator, loadLogin)
      .get("/createNote", createNote )
      .post("/createNote", saveNote)
      .get("/logOut", logOut)
      .get("/detailNote/:id", detailNote)
      .delete("/detailNote/:id", deleteNote)
      .get("/editNote/:id", edit)
      .put("/editNote/:id", update)

module.exports = router;
