const Sequelize = require('sequelize');
const db = require('../config/db');

const Admin = db.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
        unique:{args:true, msg: 'username already in use!' }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // factory: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
    // supplier: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
    company: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

module.exports = Admin;