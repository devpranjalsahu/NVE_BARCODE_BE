const Sequelize = require('sequelize');
const db = require('../config/db');
const barcodeModel = require('./barcodeModel');


const Entry = db.define('entry', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    version: { // Optimistic Locking
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    PO:{
        type: Sequelize.STRING,
    },
    STY:{
        type: Sequelize.STRING,
    },
    noOfBoxes:{
        type: Sequelize.STRING,
        allowNull: false
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
    }
    
},{
    initialAutoIncrement:"10000000",
    version:true
});


module.exports = Entry;