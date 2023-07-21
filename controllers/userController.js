const fs = require("fs");
const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const { hashSync } = require("bcryptjs");

module.exports = {
  user: async (req, res) => {
    try {
      // Obtener el usuario logueado desde la sesión
      const userLog = req.session.userLogin;

      // Obtener las notas del usuario logueado desde la base de datos
      const notesUser = await db.notes.findAll({
        where: {
          userId: userLog.id,
        },
        attributes: ["id","title", "note"],
      });

      return res.render("user", {
        notesUser: notesUser,
        title: "Inicio",
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

      const newNote = await db.notes.create({
       
        userId: req.session.userLogin.id,
        title: title,
        note: note,
      });

      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};
