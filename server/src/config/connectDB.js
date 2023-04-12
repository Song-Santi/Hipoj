const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sern_silvershop', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to conect to database:', error);
    }
}
module.exports = connectDB;