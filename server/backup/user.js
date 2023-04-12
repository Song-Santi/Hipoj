'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle
         * The `models/index` file will call this method automatically.
         * @param {*} models 
         */
        static associate(models) {
            // define association here
            //Định danh mối quan hệ ở đây: vd 1 bác sĩ có nhiều phòng khám
            //User.belongsTo(models.Role);
        }
    };
    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        roleid: DataTypes.TINYINT,
        gender: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};