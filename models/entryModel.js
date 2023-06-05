const Sequelize = require('sequelize');
const db = require('../config/db');

const Entry = db.define('entry', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    },
    shipmentSequenceId:{
        type: Sequelize.STRING,
        allowNull: false
    },
    
});

module.exports = Entry;