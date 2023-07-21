const fs = require("fs");
const db = require("../database/models");
const User = require("../database/models/user");
const Op = db.Sequelize.Op;
 module.exports = {

  index:  (req, res) => {
    return res.render("index",{
      title: "Notepad"
    })
  },
};
