const fs = require("fs");
const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");


module.exports = {
  notes: async (req, res) => {
    try {
      // Obtener el usuario logueado desde la sesión
      const userLog = req.session.userLogin;

      // Obtener las notas del usuario logueado desde la base de datos
      const notesUser = await db.notes.findAll({
        where: {
          userId: userLog.id,
        },
        attributes: ["id", "title", "note"],
      });

      return res.render("user", {
        notesUser: notesUser,
        title: "Mis Notas",
      });
    } catch (error) {
      console.log(error);
    }
  },
  createNote: (req, res) => {
    return res.render("createNote", {
      title: "Crear",
    });
  },
  saveNote: async (req, res) => {
    try {
      const { title, note } = req.body;
  
      const numeroalAzar =
        Math.floor(Math.random() * (9999999 - 555552 + 1)) + 5559;
  
      const newNote = await db.notes.create({
        id: numeroalAzar,
        userId: req.session.userLogin.id, // Establecer correctamente el userId
        title: title,
        note: note,
      });
  
      return res.redirect("/user");
    } catch (error) {
      console.log(error);
    }
  },
  
  detailNote: async (req, res) => {
    const { id } = req.params;

    try {
      const note = await db.notes.findByPk(id, {
        attributes: ["id", "title", "note", "createdAt"],
      });
      function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
          weekday: "long",
          day: "numeric",
          month: "long",
        };
        return date.toLocaleDateString("es-ES", options);
      }
      if (note) {
        note.createdAtFormatted = formatDate(note.createdAt);
      }
      /*    res.send(note) */
      return res.render("detailNote", {
        title: "Detalle",
        note:note,
      });
    } catch (error) {
      console.log(error);
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const note = await db.notes.findByPk(id,{
        attributes:["id", "title", "note", "createdAt"]
      })
    console.log(note);
       return res.render("editNote", {
      title: "Editar Nota", 
       note: note
  })
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const errors = validationResult(req);
    try {
      const { title, note } = req.body;
      const id = +req.params.id;
      
      const updatedNote = await db.notes.update({ 
        title: title,
        note: note,
        userId: req.session.userLogin.id,
      }, {
        where: { id }
      });
  
      return res.redirect("/user");
    } catch (error) {
      console.log(error);
    }
  },
  
  deleteNote: async (req,res) => {
    const {id} = req.params;
 
    try {
       
       const note = await db.notes.findByPk(id);
       console.log(note);
       await note.destroy()
      

       res.redirect("/user")
    } catch (error) {
      console.log(error)
    }
   
  }
};
