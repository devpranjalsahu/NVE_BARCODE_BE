

const _ = require('underscore');

const purchaseOrderModel = require('../models/purchaseOrderModel');
const balanceQuantityModel = require('../models/balanceQuantityModel');
const packedQuantityModel = require('../models/packedQuantityModel');
const barcodeModel = require('../models/barcodeModel');
const boxModel = require('../models/boxModel');
const shipmentModel = require('../models/shipmentModel');
const entryModel = require('../models/entryModel');
const db = require('../config/db');


const countTotal = (obj)=>{
    let sum = 0;
    const countableKeys = Object.keys(obj).filter(key => key.startsWith('SZ'))
    countableKeys.forEach( key =>{
        sum+=parseInt(obj[key]||0)
    })
    return sum
}
module.exports ={

getAll: async (req, res) => {
    const user = req.user;
    console.log(user, user.username)
   
    const entries = await entryModel.findAll({
        where:{
            username:user.username
        }
    })
    res.status(200).json({
        entries
    })
},

get: async (req, res) =>{
    const user = req.user;
    const {shipmentSequenceId} = req.query;
    const entry = await entryModel.findOne({
        where:{
            username:user.username,
            shipmentSequenceId
        }

    })

    const barcodeData = await barcodeModel.findOne({
        where:{
            shipmentSequenceId:shipmentSequenceId
        }
    })

    const boxData = await boxModel.findAll({
        where:{
            barcodeId:barcodeData.id

        },
        include:[purchaseOrderModel]
    })



    // console.log(boxData)
    res.status(200).json({
        barcodeData,
        boxData
    })
},
new: async (req, res)=>{
    const user = req.user;
    const fact = user.factory || null;
    const sup = user.supplier || null;
    const {poEntries, userEntries,weightData} = req.body;
    const shipmentSequence = await shipmentModel.create({
        username:user.username
    });
    const entry = await entryModel.create({
        username:user.username,
        noOfBoxes:weightData.numOfBoxes,
            NetWt:weightData.NetWt,
            GrossWt:weightData.GrossWt,
            Length:weightData.Length,
            Width:weightData.Width,
            Height:weightData.Height,
            shipmentSequenceId:shipmentSequence.id,
            ShipNo:weightData.ShipNo
    })


    for(let i = 0; i <weightData.numOfBoxes;i++){
        const bc = barcodeModel.create({
            username:user.username,
            NetWt:weightData.NetWt,
            GrossWt:weightData.GrossWt,
            Length:weightData.Length,
            Width:weightData.Width,
            Height:weightData.Height,
            shipmentSequenceId:shipmentSequence.id,
            ShipNo:weightData.ShipNo
            }).then(async res => {
                const keys = Object.keys(userEntries);
                console.log(keys,'xx')
                for(const key of keys){
                    
                    await boxModel.create({
                        barcodeID:res.id,
                        purchaseOrderID:poEntries[key],
            shipmentSequenceId:shipmentSequence.id,

                        ...userEntries[key],
                    })
                }   
            });
    }

    const keys = Object.keys(userEntries);
    for (const key of keys) {
       const currentPackedQuantity = await packedQuantityModel.findOne({
            where:{
                purchaseOrderId:poEntries[key]
            }
        });
       const totalQuantity = await purchaseOrderModel.findOne({
            where:{
                id:poEntries[key]
            }
        });
        const totalPackedQuantity = {
            SZ01:parseInt(currentPackedQuantity.SZ01||0)+parseInt(userEntries[key].SZ01||0)*parseInt(weightData.numOfBoxes||0),
            SZ02:parseInt(currentPackedQuantity.SZ02||0)+parseInt(userEntries[key].SZ02||0)*parseInt(weightData.numOfBoxes||0),
            SZ03:parseInt(currentPackedQuantity.SZ03||0)+parseInt(userEntries[key].SZ03||0)*parseInt(weightData.numOfBoxes||0),
            SZ04:parseInt(currentPackedQuantity.SZ04||0)+parseInt(userEntries[key].SZ04||0)*parseInt(weightData.numOfBoxes||0),
            SZ05:parseInt(currentPackedQuantity.SZ05||0)+parseInt(userEntries[key].SZ05||0)*parseInt(weightData.numOfBoxes||0),
            SZ06:parseInt(currentPackedQuantity.SZ06||0)+parseInt(userEntries[key].SZ06||0)*parseInt(weightData.numOfBoxes||0),
            SZ07:parseInt(currentPackedQuantity.SZ07||0)+parseInt(userEntries[key].SZ07||0)*parseInt(weightData.numOfBoxes||0),
            SZ08:parseInt(currentPackedQuantity.SZ08||0)+parseInt(userEntries[key].SZ08||0)*parseInt(weightData.numOfBoxes||0),
            SZ09:parseInt(currentPackedQuantity.SZ09||0)+parseInt(userEntries[key].SZ09||0)*parseInt(weightData.numOfBoxes||0),
            SZ10:parseInt(currentPackedQuantity.SZ10||0)+parseInt(userEntries[key].SZ10||0)*parseInt(weightData.numOfBoxes||0),
            SZ11:parseInt(currentPackedQuantity.SZ11||0)+parseInt(userEntries[key].SZ11||0)*parseInt(weightData.numOfBoxes||0),
            SZ12:parseInt(currentPackedQuantity.SZ12||0)+parseInt(userEntries[key].SZ12||0)*parseInt(weightData.numOfBoxes||0),
        }
        const totalBalanceQuantity = {
            SZ01:parseInt(totalQuantity.SZ01||0)-parseInt(totalPackedQuantity.SZ01||0),
            SZ02:parseInt(totalQuantity.SZ02||0)-parseInt(totalPackedQuantity.SZ02||0),
            SZ03:parseInt(totalQuantity.SZ03||0)-parseInt(totalPackedQuantity.SZ03||0),
            SZ04:parseInt(totalQuantity.SZ04||0)-parseInt(totalPackedQuantity.SZ04||0),
            SZ05:parseInt(totalQuantity.SZ05||0)-parseInt(totalPackedQuantity.SZ05||0),
            SZ06:parseInt(totalQuantity.SZ06||0)-parseInt(totalPackedQuantity.SZ06||0),
            SZ07:parseInt(totalQuantity.SZ07||0)-parseInt(totalPackedQuantity.SZ07||0),
            SZ08:parseInt(totalQuantity.SZ08||0)-parseInt(totalPackedQuantity.SZ08||0),
            SZ09:parseInt(totalQuantity.SZ09||0)-parseInt(totalPackedQuantity.SZ09||0),
            SZ10:parseInt(totalQuantity.SZ10||0)-parseInt(totalPackedQuantity.SZ10||0),
            SZ11:parseInt(totalQuantity.SZ11||0)-parseInt(totalPackedQuantity.SZ11||0),
            SZ12:parseInt(totalQuantity.SZ12||0)-parseInt(totalPackedQuantity.SZ12||0),
        }
        const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
        const totalBalance = sumValues(totalBalanceQuantity);
        const totalPacked = sumValues(totalPackedQuantity);
        await balanceQuantityModel.update({...totalBalanceQuantity,
            TOT_QTY:totalBalance,

        },{
            where:{
                purchaseOrderId:poEntries[key]
            }
        })
        await packedQuantityModel.update({...totalPackedQuantity,
            TOT_QTY:totalPacked},{
            where:{
                purchaseOrderId:poEntries[key]
            }
        })
        
    }
    
    res.json({message:'success'})
},
delete: async ( req, res) =>{
    const user = req.user;
    const {shipmentSequenceId} = req.query;
    if(!shipmentSequenceId) return res.status(400).json({
        status:'fail',
        message:"No shipmentSequenceID"
    })
    
    // Check if shipmentSequenceId exists
    // Also verifying user is same

    const shipmentSequenceDetails = await shipmentModel.findOne({
        where:{
            id:shipmentSequenceId
        }
    })

    if(shipmentSequenceDetails==null) return res.status(400).json({
        message:"not entry found"
    })

    if(shipmentSequenceDetails.username !== user.username) return res.status(409).json({
        message:"Entry doesn't belong to you"
    })

    const boxes = await boxModel.findAll({
        where:{
            shipmentSequenceId
        },
        raw:true
    })
    const groupedById = _.groupBy(boxes,'purchaseOrderID');
    const totalQtyByIds = {};
    const totalQuantities = {};
    Object.keys(groupedById).forEach(key => {
        totalQuantities[key] =  countTotal(groupedById[key][0])*groupedById[key].length
        var sumObj = {
            SZ01:0,
            SZ02:0,
            SZ03:0,
            SZ04:0,
            SZ05:0,
            SZ06:0,
            SZ07:0,
            SZ08:0,
            SZ09:0,
            SZ10:0,
            SZ11:0,
            SZ12:0
        }
        const data = groupedById[key];
        data.forEach(d =>{
            sumObj = {
                SZ01:sumObj.SZ01+(parseInt(d.SZ01)||0),
                SZ02:sumObj.SZ02+(parseInt(d.SZ02)||0),
                SZ03:sumObj.SZ03+(parseInt(d.SZ03)||0),
                SZ04:sumObj.SZ04+(parseInt(d.SZ04)||0),
                SZ05:sumObj.SZ05+(parseInt(d.SZ05)||0),
                SZ06:sumObj.SZ06+(parseInt(d.SZ06)||0),
                SZ07:sumObj.SZ07+(parseInt(d.SZ07)||0),
                SZ08:sumObj.SZ08+(parseInt(d.SZ08)||0),
                SZ09:sumObj.SZ09+(parseInt(d.SZ09)||0),
                SZ10:sumObj.SZ10+(parseInt(d.SZ10)||0),
                SZ11:sumObj.SZ11+(parseInt(d.SZ11)||0),
                SZ12:sumObj.SZ12+(parseInt(d.SZ12)||0),
            }
        })
        totalQtyByIds[key] = sumObj
    })
    const t = await db.transaction();
    try {
        for(var key of  Object.keys(groupedById)){
                await balanceQuantityModel.increment({
                    ...totalQtyByIds[key],
                    TOT_QTY:totalQuantities[key]
                },{
                    where:{
                        purchaseOrderId:key
                    },
                    transaction:t
                })
                await packedQuantityModel.decrement({
                    ...totalQtyByIds[key],
                    TOT_QTY:totalQuantities[key]
                },{
                    where:{
                        purchaseOrderId:key
                    },
                    transaction:t
                }) 
                await boxModel.destroy(
                    {
                        where:{
                            shipmentSequenceId,
                            purchaseOrderID:key
                        },
                        transaction:t
                    }
                )
                await entryModel.destroy(
                    {
                        where:{
                            shipmentSequenceId,
                        }
                    }
                )
                
             }

            
      
        // If the execution reaches this line, the transaction has been committed successfully
        // `result` is whatever was returned from the transaction callback (the `user`, in this case)
      
      } catch (error) {
      console.log('e',error)
      await t.rollback();
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
      
      }
      console.log('pp')
      await t.commit();
    res.json({
        message:"success"

    })
}
}