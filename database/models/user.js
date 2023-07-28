'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      user.hasMany(models.notes, {
        as: "note",
        foreignKey: "userId",
        onDelete: "cascade",
      });


    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    socialId: DataTypes.STRING,
    socialProvider: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};