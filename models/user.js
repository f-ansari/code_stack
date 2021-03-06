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
      User.hasMany(models.Deck, { foreignKey: 'userId' })
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
        defaultValue: 'https://i.imgur.com/od6ga6F.png'
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
