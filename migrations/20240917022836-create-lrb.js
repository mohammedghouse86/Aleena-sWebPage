'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('lrbs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userID:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // PostID column might already exist, so you can comment or remove this
      // PostID:{
      //   type: DataTypes.INTEGER,
      //   allowNull: false
      // },
      likes: {
        type: DataTypes.BOOLEAN
      },
      retweet: {
        type: DataTypes.BOOLEAN
      },
      bookmarks: {
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lrbs');
  }
};