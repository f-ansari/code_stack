'use strict'; 

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'flashcards',
      [
        {
          title:'ClassName',
          notes:'className is to idenfity what need to get style',
          codeBlock:'<div className=button>',
          deckId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('flashcards', null, {})
  }
}

