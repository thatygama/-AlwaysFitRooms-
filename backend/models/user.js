'use strict';
const { Model } = require('sequelize');

class User extends Model {
  static associate(models) {
    User.hasMany(models.Reservation, { foreignKey: 'user_id' });
  }
}
module.exports = (sequelize, DataTypes) => {
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permission: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  
  return User;
};
