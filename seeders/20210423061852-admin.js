"use strict";
// https://sequelize.org/master/manual/migrations.html#running-seeds
// npx sequelize db:seed:all

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Hanvito Michael Lee",
          username: "vitomichael",
          password: "81dc9bdb52d04dc20036dbd8313ed055",
          email: "hanvitomichaellee@student.telkomuniversity.ac.id",
          role: "admin",
        },
        {
          fullName: "Michael",
          username: "krobus",
          password: "81dc9bdb52d04dc20036dbd8313ed055",
          email: "krobus@student.telkomuniversity.ac.id",
          role: "user",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
