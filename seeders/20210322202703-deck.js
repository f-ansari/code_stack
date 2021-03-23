const faker = require('faker')
const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ raw: true })
    let decks = [...Array(30)].map(() => ({
      title: faker.lorem.word(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      likeCount: faker.random.number({ min: 0, max: 10 }),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('decks', decks)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('decks', null, {})
  }
}
