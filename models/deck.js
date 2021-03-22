'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Deck.hasMany(models.Flashcard, { foreignKey: 'deckId' })
      Deck.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Deck.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      likeCount: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Deck',
      tableName: 'decks'
    }
  )
  return Deck
}
