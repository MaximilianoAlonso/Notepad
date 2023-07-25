const express = require('express');
const router = express.Router();
const {notes, createNote, saveNote, detailNote,deleteNote,edit,update} = require('../controllers/notesController');

/* Validaciones y middlewares*/
const loginValidator = require("../validations/loginValidator")
const registerValidator = require("../validations/registerValidator")
const checkUserGuest = require("../middlewares/checkUserGuest")



/* GET users listing. */
router.get('/',checkUserGuest, notes)
      .get("/createNote", createNote )
      .post("/createNote", saveNote)
      .get("/detailNote/:id", detailNote)
      .delete("/detailNote/:id", deleteNote)
      .get("/editNote/:id", edit)
      .put("/editNote/:id", update)

module.exports = router;
