'use strict'; 

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'decks',
      [
        {
          title:'HTML',
          userId: 1,
          likecount: 10 ,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('decks', null, {})
  }
}

