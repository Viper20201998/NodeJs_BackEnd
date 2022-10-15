"use strict";

/** @type { import('sequelize-cli').Migration }**/
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tasks",
      [
        {
          id: 1,
          description: "grabar el curso de backend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          description: "editar los videos del curso de backend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          description: "subir los videos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
