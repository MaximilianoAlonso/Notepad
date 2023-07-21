const fs = require("fs");
const path = require("path");
const { check, body } = require("express-validator");
const db = require("../database/models");
const {compareSync} =require("bcryptjs")

module.exports = [
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email tiene un formato incorrecto"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .custom((value, { req }) => {
      /* busca el usuario en base de datos */
      return db.user
        .findOne({
          where: {
            email: req.body.email,
          },
        })
        /* compara los datos ingresados con los de la base de datos*/
        .then((user) => {
          if (!user || !compareSync(value, user.password)) {
            
            return Promise.reject();
          }
        })
  
        .catch((error) => Promise.reject("Credenciales inválidas"));
    }),
];
