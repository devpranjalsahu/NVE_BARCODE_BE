const Sequelize = require("sequelize");
const db = require("../config/db");

const BoxMaster = db.define("boxMaster", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  NetWt: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  GrossWt: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Length: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Width: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Height: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ShipNo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = BoxMaster;
