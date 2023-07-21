const fs = require("fs");
const path = require("path");
const { check, body } = require("express-validator");
const db = require("../database/models");
let regExPass =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&,._-])[A-Za-z\d$@$!%*?&,._-]{6,12}/;

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Mínimo de dos letras")
    .bail()
    .isAlpha("es-ES", {
      ignore: " ",
    })
    .withMessage("Solo caracteres alfabéticos"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debe ser un email con formato válido")
    .custom((value, { req }) => {
      return db.user
        .findOne({
          where: {
            email: value,
          },
        })
        .then((user) => {
          if (user) {
            return Promise.reject();
          }
        })
        .catch((error) => {
          console.log(error);
          return Promise.reject("El email ya se encuentra registrado");
        });
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .custom((value, { req }) => {
      if (!regExPass.test(value.trim())) {
        return false;
      }
      return true;
    })
    .withMessage(
      "Debe tener una mayúscula, una minúscula, un número y un simbolo especial (@$!%*?&_-). Min: 8 y máx: 12"
    ),
  body("password2")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Las contraseñas no coinciden"),
];
