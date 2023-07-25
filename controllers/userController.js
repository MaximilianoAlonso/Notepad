const fs = require("fs");
const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const { hashSync } = require("bcryptjs");


module.exports = {
 
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
    return res.render("register", {
      title: "Registrate!",
      errors: errorObjet
    });
  },
  login: (req, res) => {
    return res.render("login", {
      title: "Ingresar!",
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
 /*     return res.send(errors.mapped().password.msg) */
      return res.render('login', {
        title: 'Ingresar!',
        errors: errors.mapped,
        old: req.body,
    })

    }
  },
  logOut: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
};
