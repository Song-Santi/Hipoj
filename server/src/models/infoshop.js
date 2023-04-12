'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Infoshop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Infoshop.init({
    nameShop: DataTypes.STRING,
    title: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    zaloPhone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Infoshop',
  });
  return Infoshop;
};