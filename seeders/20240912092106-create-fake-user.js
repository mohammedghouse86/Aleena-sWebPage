'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('WebSiteUsers', [{
      id: 100,
      uuid: "b9601d9b-07f1-4bf1-966e-932c77aa4475",
      name: "Jon Jones",
      email: "Jon@mail.com",
      role: "MMA Entertainer",
      age: 27,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 101,
      uuid: "b9601d4b-07f1-4bf1-966e-932c77aa4475",
      name: "Khamzat Chimiave",
      email: "Khamzat@mail.com",
      role: "MMA Entertainer",
      age: 23,
      createdAt: new Date(),
      updatedAt: new Date()
      }
        ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('WebSiteUsers', null, {});
  }
};
