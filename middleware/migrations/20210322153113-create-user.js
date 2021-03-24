'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      handle: { type: Sequelize.STRING, allowNull: false, unique: true },
      name: { type: Sequelize.STRING, defaultValue: 'User' },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
        unique: true
      },
      passwordDigest: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      avatarUrl: {
        type: Sequelize.STRING,
        defaultValue: '../assets/default-avatar.png'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
}
