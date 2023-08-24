'use strict';
const { Model } = require('sequelize');

class Reservation extends Model {
  static associate(models) {
    Reservation.belongsTo(models.User, { foreignKey: 'user_id' });
    Reservation.belongsTo(models.Room, { foreignKey: 'room_id' });
  }
}

module.exports = (sequelize, DataTypes) => {  
  Reservation.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departure_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Reservation',
    tableName: 'reservations'
  });
  
  return Reservation;
};
