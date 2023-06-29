const Sequelize = require('sequelize');
const db = require('../config/db');
const purchaseOrderModel = require('./purchaseOrderModel');
const boxModel = require('./boxModel');




const Barcode = db.define('barcode', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    // username:{
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    entryId:{
        type: Sequelize.BIGINT,
        allowNull:false
    }

},{
    initialAutoIncrement:"34029015993015800"
});
// Barcode.hasMany(boxModel, {foreignKey:'entryId'})
// Barcode.hasMany(boxModel, { foreignKey: "entryId" });
// boxModel.belongsTo(Barcode, { foreignKey: "entryId"});



module.exports = Barcode;