const faker = require('faker')
const bcrypt = require('bcrypt')

const users = [...Array(10)].map(() => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  handle: faker.internet.userName(),
  passwordDigest: '',
  avatarUrl: faker.internet.avatar(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(15)
}))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', users)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
