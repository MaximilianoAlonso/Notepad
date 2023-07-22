const fs = require("fs");
const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const { hashSync } = require("bcryptjs");
const { includes } = require("../validations/loginValidator");
const { v4: uuidv4 } = require("uuid");
const { Console } = require("console");

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
  register: (req, res) => {
    return res.render("register", {
      title: "Registrate!",
    });
  },
  saveRegister: async (req, res) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      const { name, email, password } = req.body;
      try {
        const newUser = await db.user.create({
          name: name.trim(),
          email: email.trim(),
          password: hashSync(password, 10),
        });
        return res.redirect("/user/login");
      } catch (error) {
        console.error(error);
      }
    }
    const errorObjet = error.mapped();
    return res.send(errorObjet);
  },
  login: (req, res) => {
    return res.render("login", {
      title: "Ingresa!",
    });
  },
  loadLogin: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const userLog = await db.user.findOne({
          where: {
            email: req.body.email,
          },
          attributes: ["id", "name", "email"],
          include: {
            association: "note",
            attributes: ["title", "note"],
          },
        });

        const notesUser = [];
        userLog.note.forEach((element) => {
          notesUser.push(element);
        });

        req.session.userLogin = {
          id: userLog.id,
          name: userLog.name,
          email: userLog.email,
          notesUser: notesUser,
        };

        /* devuelve los datos del usuario logueado */
        return res.redirect("/user");
      } catch (error) {
        /* Aca me daria errores de base de datos */
        console.log(error);
      }
    } else {
      /* aca me daria los errores de las validaciones */
      return res.send(errors.mapped());
    }
  },
  logOut: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
  createNote: (req, res) => {
    return res.render("createNote", {
      title: "Crear",
    });
  },
  saveNote: async (req, res) => {
    try {
      const { id, title, note } = req.body;

      const numeroalAzar =
        Math.floor(Math.random() * (9999999 - 555552 + 1)) + 5559;

      const newNote = await db.notes.create({
        id: numeroalAzar,
        userId: req.session.userLogin.id,
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

    const id = +req.params.id

      const newNote = await db.notes.update({ 
        title: title,
        note: note,
      },{
        where:{id}
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
