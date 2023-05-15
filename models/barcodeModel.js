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
    }
});

module.exports = Barcode;