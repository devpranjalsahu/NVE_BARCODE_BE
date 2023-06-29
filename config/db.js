const { Sequelize } = require('sequelize');
// const db = new Sequelize('xmqqdtso', 'xmqqdtso', 'W6T2lOzzYYz9neT_kbyiJKv5QmIqO5rr', {
//     host: 'tyke.db.elephantsql.com',
//     dialect: 'postgres',
//     logging: false,
//     pool: {
//         max: 5,
//         min: 2,
//         acquire: 30000,
//         idle: 10000
//     }
// });
const db = new Sequelize('dblerros', 'lerrosit', '*%SSub`}?b#yb6t>,u~xKilS|,Krm46+', {
    host: 'ls-70ca57a443601efc9a62786077cb7aca6070ca89.crskyfemwznl.ap-south-1.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306,
    logging: false,
    pool: {
        max: 5,
        min: 2,
        acquire: 30000,
        idle: 10000
    }
});
// const db = new Sequelize('lerrosit_userinput', 'lerrosit', 'P@ssw0rd400', {
//     host: 'localhost:3306',
//     dialect: 'mysql',
//     logging: false,
//     pool: {
//         max: 5,
//         min: 2,
//         acquire: 30000,
//         idle: 10000
//     }
// });

module.exports = db;