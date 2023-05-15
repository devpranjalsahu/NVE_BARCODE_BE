const { Sequelize } = require('sequelize');
const db = new Sequelize('test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;