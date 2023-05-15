const Sequelize = require('sequelize');
const db = require('../config/db');
const balanceQuantityModel = require('./balanceQuantityModel');
const packedQuantityModel = require('./packedQuantityModel');



const PO = db.define('purchaseOrder', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    SOL: {
        type: Sequelize.STRING,
        allowNull: false
    },
    FCUS:{
        type: Sequelize.STRING,
        allowNull: false
    },
    TYP:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SUP:{
        type: Sequelize.STRING,
        allowNull: false
    },
    FACT:{
        type: Sequelize.STRING,
        allowNull: false
    },
    PO:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SEA:{
        type: Sequelize.STRING,
        allowNull: false
    },
    STY:{
        type: Sequelize.STRING,
        allowNull: false
    },
    DES:{
        type: Sequelize.STRING,
        allowNull: false
    },
    SIZE:{
        type: Sequelize.STRING,
        allowNull: false
    },
    LOT:{
        type: Sequelize.STRING,
        allowNull: false
    },
    CLR:{
        type: Sequelize.STRING,
        allowNull: false
    },
    DIM:{
        type: Sequelize.STRING,
        allowNull: false
    },
    TOT_QTY:{
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
    },
    
});
PO.hasOne(packedQuantityModel)
PO.hasOne(balanceQuantityModel)
balanceQuantityModel.belongsTo(PO,{
    foreignKey: "id",
    as: "balanceQuantity2",
  })
packedQuantityModel.belongsTo(PO,{
    foreignKey: "id",
    as: "packedQuantity2",
  })
module.exports = PO;