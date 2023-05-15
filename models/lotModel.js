const Sequelize = require('sequelize');
const db = require('../config/db');

const Lot = db.define('lot', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    LOT: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    SR01:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR02:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR03:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR04:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR05:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR06:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR07:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR08:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR09:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR10:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR11:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SR12:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
});

module.exports = Lot;