const Sequelize = require('sequelize');
const db = require('../config/db');

const Barcode = db.define('barcode', {
    id: {
        type: Sequelize.BIGINT,
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
    ShipNo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    shipmentSequenceId:{
        type: Sequelize.STRING,
        allowNull: false
    },


},{
    initialAutoIncrement:"34029015993015800"
});

module.exports = Barcode;