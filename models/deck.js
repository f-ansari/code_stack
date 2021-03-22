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
      title: { type: DataTypes.STRING, allowNull: false },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' }
      },
      likeCount: { type: DataTypes.INTEGER, defaultValue: 0 }
    },
    {
      sequelize,
      modelName: 'Deck',
      tableName: 'decks'
    }
  )
  return Deck
}
