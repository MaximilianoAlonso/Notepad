"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "notes",
      [
        {
          userId: 1,
          title: "Prueba 1 usuario 1",
          note: "Nota de prueba numero uno",
        },
        {
          userId: 1,
          title: "Prueba 2 usuario 1",
          note: "Nota de prueba numero dos",
        },
        {
          userId: 2,
          title: "Prueba 3 usuario 2",
          note: "Nota de prueba numero tres",
        },
        {
          userId: 2,
          title: "Prueba 4 usuario 2",
          note: "Nota de prueba numero cuatro",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("notes", null, {});
  },
};
