const Sequelize = require('sequelize');
const db = require('../config/db');
const purchaseOrderModel = require('./purchaseOrderModel');
const boxModel = require('./boxModel');
const entryModel = require('./entryModel');





const Barcode = db.define('barcode', {
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
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    entryId:{
        type: Sequelize.BIGINT,
        allowNull:false
    }

},{
    initialAutoIncrement:"34029015993015800",
    version:true
});



module.exports = Barcode;