const Sequelize = require('sequelize');
const db = require('../config/db');
const purchaseOrderModel = require('./purchaseOrderModel');



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
    entryId:{
        type: Sequelize.BIGINT,
        allowNull:false
    }

},{
    initialAutoIncrement:"34029015993015800"
});



module.exports = Barcode;