const { Op } = require('sequelize');
const purchaseOrderModel = require('../models/purchaseOrderModel');
const balanceQuantityModel = require('../models/balanceQuantityModel');
const packedQuantityModel = require('../models/packedQuantityModel');
const barcodeModel = require('../models/barcodeModel');








module.exports ={

new: async (req, res)=>{
    const user = req.user;
    const fact = user.factory || null;
    const sup = user.supplier || null;
    const {purchaseOrderId, entries} = req.body;
    console.log(entries,purchaseOrderId);
    const bc = await barcodeModel.create({
        username:user.username,
    })

    // First, we start a transaction from your connection and save it into a variable
// const t = await sequelize.transaction();

// try {

  
//   await t.commit();

// } catch (error) {

  
//   await t.rollback();

// }
    res.json({message:'success',bc})
}

}