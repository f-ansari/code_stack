const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await Promise.all(
      [...Array(10)].map(async () => ({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        handle: faker.internet.userName(),
        passwordDigest: await bcrypt.hash('1234', 1),
        avatarUrl: faker.internet.avatar(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(15)
      }))
    )
    await queryInterface.bulkInsert('users', users)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
