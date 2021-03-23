const faker = require('faker')
const { Deck } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const decks = await Deck.findAll({ raw: true })
    const flashcards = [...Array(100)].map(() => ({
      title: faker.lorem.word(),
      notes: faker.lorem.sentence(),
      codeBlock: faker.lorem.words(),
      deckId: decks[Math.floor(Math.random() * decks.length)].id,
      language: faker.lorem.word(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('flashcards', flashcards)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('flashcards', null, {})
  }
}
