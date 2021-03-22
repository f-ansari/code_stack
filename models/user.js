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
      User.hasMany(models.Deck, { foreignKey: 'userId' })
    }
  }
  User.init(
    {
      handle: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, validate: { isEmail: true } },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      avatarUrl: {
        type: DataTypes.STRING,
        defaultValue:
          'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'
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
