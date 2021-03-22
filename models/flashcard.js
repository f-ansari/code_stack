'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Flashcard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Flashcard.belongsTo(models.Deck, { foreignKey: 'deckId' })
    }
  }
  Flashcard.init(
    {
      title: DataTypes.STRING,
      notes: DataTypes.STRING,
      codeBlock: DataTypes.STRING,
      deckId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'decks', key: 'id' }
      }
    },
    {
      sequelize,
      modelName: 'Flashcard',
      tableName: 'flashcards'
    }
  )
  return Flashcard
}
