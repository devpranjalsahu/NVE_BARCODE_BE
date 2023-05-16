const { Sequelize } = require('sequelize');
const db = new Sequelize('sql12618725', 'sql12618725', '43DaEcYPwa', {
    host: 'sql12.freemysqlhosting.net',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;