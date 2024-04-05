'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
      uuid : {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING,allowNull: false

      },
      email: {
        type: DataTypes.STRING,allowNull: false

      },
      role: {
        type: DataTypes.STRING,allowNull: false

      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a password' },
          notEmpty: { msg: 'Password must not be empty' }
        }
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Users');
  }
};