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
      handle: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
      passwordDigest: {
        type: Sequelize.STRING
      },
      avatarUrl: {
        type: Sequelize.STRING
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
