const Sequelize = require('sequelize');
const db = require('../config/db');

const shipmentSequence = db.define('shipmentSequence', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    initialAutoIncrement:"10000000"
});

module.exports = shipmentSequence;