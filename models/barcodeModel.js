const Sequelize = require('sequelize');
const db = require('../config/db');

const Barcode = db.define('barcode', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    NetWt:{
        type: Sequelize.STRING,
        allowNull: false
    },
    GrossWt:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Length:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Width:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Height:{
        type: Sequelize.STRING,
        allowNull: false
    },

});

module.exports = Barcode;