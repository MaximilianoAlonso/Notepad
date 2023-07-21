"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Pedro",
          email: "pedro@pedro.com",
          password: "1234"
        },
        {
          name: "alex",
          email: "alex@alex.com",
          password: "5678"
        },
  
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
