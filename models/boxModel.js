const Sequelize = require('sequelize');
const db = require('../config/db');
const purchaseOrderModel = require('./purchaseOrderModel');
const barcodeModel = require('./barcodeModel');



const Box = db.define('box', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    barcodeID: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    purchaseOrderID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    shipmentSequenceId:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ01:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ02:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ03:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ04:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ05:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ06:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ07:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ08:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ09:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ10:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ11:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SZ12:{
        type: Sequelize.STRING,
        allowNull: false
    }
    
});


Box.belongsTo(purchaseOrderModel)
// Box.belongsTo(barcodeModel)

// purchaseOrderModel.belongsToMany(Box,{ through: 'BoxPo' })


module.exports = Box;