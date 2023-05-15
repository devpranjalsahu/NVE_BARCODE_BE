const Sequelize = require('sequelize');
const db = require('../config/db');

const PQ = db.define('packedQuantity', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    purchaseOrderId: {
        type: Sequelize.INTEGER,
        unique:true
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
        allowNull: false,
        defaultValue:"0"
    },
    SZ01:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ02:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ03:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ04:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ05:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ06:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ07:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ08:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ09:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ10:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ11:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    SZ12:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    
});

module.exports = PQ;