const { Sequelize } = require('sequelize');
// const db = new Sequelize('sql12618725', 'sql12618725', '43DaEcYPwa', {
//     host: 'sql12.freemysqlhosting.net',
//     dialect: 'mariadb',
//     logging: false,
//     pool: {
//         max: 5,
//         min: 2,
//         acquire: 30000,
//         idle: 10000
//     }
// });
const db = new Sequelize('appdb', 'dbadmin', 'pranjal', {
    host: '216.48.176.148',
    dialect: 'mariadb',
    logging: false,
    pool: {
        max: 5,
        min: 2,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;