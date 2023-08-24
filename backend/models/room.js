'use strict';
const { Model } = require('sequelize');

class Room extends Model {
  static associate(models) {
    Room.hasMany(models.Reservation, { foreignKey: 'room_id' });
  }
}

module.exports = (sequelize, DataTypes) => {
  Room.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    participant_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'rooms'
  });
  
  return Room;
};
