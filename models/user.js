'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Deck, { as: 'decks', foreignKey: 'userId'})
      User.hasMany(models.FlashCard, { as: 'flashcards', foreignKey: 'userId'})
    }
  }
  User.init(
    {
      handle: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: { type: DataTypes.STRING, defaultValue: 'User' },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        unique: true
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      avatarUrl: {
        type: DataTypes.STRING,
        defaultValue: '../assets/default-avatar.png'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
