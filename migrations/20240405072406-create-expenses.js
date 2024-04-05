'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      otherCategory: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      uuid : {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Expenses');
  }
};