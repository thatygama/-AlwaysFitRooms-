'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.Reservation, { foreignKey: 'room_id' });
    }
  }
  
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
  });
  
  return Room;
};
