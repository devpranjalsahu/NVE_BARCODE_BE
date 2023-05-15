const { Op } = require('sequelize');
const purchaseOrderModel = require('../models/purchaseOrderModel');
const balanceQuantityModel = require('../models/balanceQuantityModel');
const packedQuantityModel = require('../models/packedQuantityModel');







module.exports ={

getPurchaseOrders: async (req, res)=>{
    const user = req.user;
    const fact = user.factory || null;
    const sup = user.supplier || null;
    const poData = await purchaseOrderModel.findAll({
        where:{
            [Op.and]: [
                fact ? {Fact:fact} : null,
                sup ? {SUP:sup} : null,
              ].filter(x => x!=null)
        }
    })
    res.json(poData)
},

getFilteredPurchaseOrders: async (req, res) => {

    const user = req.user;
    const {PO, STY, SEA, LOT, DIM, CLR} = req.body;
    const fact = user.factory || null;
    const sup = user.supplier || null;
    const poData = await purchaseOrderModel.findAll({
        where:{
            [Op.and]: [
                fact ? {Fact:fact} : null,
                sup ? {SUP:sup} : null,
                PO ? {PO} : null,
                STY? {STY} : null,
                SEA? {SEA} : null,
                LOT? {LOT} : null,
                DIM? {DIM} : null,
                CLR? {CLR} : null,
            ].filter(x => x!=null)
        },
        include:[balanceQuantityModel,packedQuantityModel]
    })

    res.status(200).json(poData)
},

}