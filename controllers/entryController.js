

const _ = require('underscore');

const purchaseOrderModel = require('../models/purchaseOrderModel');
const balanceQuantityModel = require('../models/balanceQuantityModel');
const packedQuantityModel = require('../models/packedQuantityModel');
const barcodeModel = require('../models/barcodeModel');
const entryModel = require('../models/entryModel');
const db = require('../config/db');
const BoxItem = require('../models/boxModel');


const countTotal = (obj)=>{
    let sum = 0;
    const countableKeys = Object.keys(obj).filter(key => key.startsWith('SZ'))
    countableKeys.forEach( key =>{
        sum+=parseInt(obj[key]||0)
    })
    console.log(sum)
    return sum
}
module.exports ={

getAll: async (req, res) => {
    const user = req.user;

   
    var entries = await entryModel.findAll({
        where:{
            username:user.username
        },
        raw:true
    })
    // const requests =  entries.map(async (entry,i)=>{
    //     const barcodeData = await barcodeModel.findOne({
    //         where:{
    //             id:entry.id
    //         }
    //     })
    
    //     const boxData = await boxModel.findOne({
    //         where:{
    //             id:entry.id
    
    //         },
    //         raw:true,
    //         include:[purchaseOrderModel]
    //     })

    //     // entry.PO = boxData['purchaseOrder.PO']||'null';
    //     // entry.STY = boxData['purchaseOrder.STY']||'null';
    // })
    
    
      // Wait for all requests, and then setState
    //   return Promise.all(requests).then(() => {
    //     console.log('send')
    // res.status(200).json({
    //     entries
    // })
    //   });
      res.status(200).json({
        entries})
    // console.log(entries)

},

get: async (req, res) =>{
    const user = req.user;
    const {id} = req.query;
    const entry = await entryModel.findOne({
        where:{
            username:user.username,
            id
        }

    })
    if(entry === null) return res.status(400).json({
        message:'No data found!'
    })
    const boxData = await BoxItem.findAll({
        where:{
            entryId:id

        },
        include:[purchaseOrderModel]
    })



    // console.log(boxData)
    res.status(200).json({
        entry,
        boxData
    })
},
new: async (req, res)=>{
    const user = req.user;
    const fact = user.factory || null;
    const sup = user.supplier || null;
    const {poEntries, userEntries,weightData} = req.body;
    const poKeys = Object.keys(poEntries);
    const poId = poEntries[poKeys[0]]
    const purchaseOrder = await purchaseOrderModel.findByPk(poId);
    if(!purchaseOrder) return res.status(400).json({
        message:"Data invalid"
    })
    const entry = await entryModel.create({
            username:user.username,
            noOfBoxes:weightData.numOfBoxes,
            NetWt:weightData.NetWt,
            GrossWt:weightData.GrossWt,
            Length:weightData.Length,
            Width:weightData.Width,
            Height:weightData.Height,
            ShipNo:weightData.ShipNo,
            PO:purchaseOrder.PO,
            STY:purchaseOrder.STY
    })
    for(let i = 0; i <weightData.numOfBoxes;i++){
        const bc = barcodeModel.create({
            username:user.username,
            entryId:entry.id,
            })
    }
    const keys = Object.keys(userEntries);
    for (const key of keys) {
        await BoxItem.create({
            purchaseOrderId:poEntries[key],
            entryId:entry.id,
            ...userEntries[key],
            TOT_QTY:countTotal(userEntries[key])
        })
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
    const {id} = req.query;
    if(!id) return res.status(400).json({
        status:'fail',
        message:"No id found"
    })
    
    // Check if id exists
    // Also verifying user is same

    const entryDetails = await entryModel.findOne({
        where:{
            id:id
        },
        raw:true
    })

    if(entryDetails==null) return res.status(400).json({
        message:"no entry found"
    })

    if(entryDetails.username !== user.username) return res.status(409).json({
        message:"Entry doesn't belong to you"
    })

    const boxes = await BoxItem.findAll({
        where:{
            entryId:id
        },
        raw:true
    })
    const groupedById = _.groupBy(boxes,'purchaseOrderId');

    const totalQtyByIds = {};
    const totalQuantities = {};
    Object.keys(groupedById).forEach(key => {
        var total = countTotal(groupedById[key][0])*entryDetails.noOfBoxes
        totalQuantities[key] =  total
        const d = groupedById[key][0];
            sumObj = {
                SZ01:(parseInt(d.SZ01)||0)*entryDetails.noOfBoxes,
                SZ02:(parseInt(d.SZ02)||0)*entryDetails.noOfBoxes,
                SZ03:(parseInt(d.SZ03)||0)*entryDetails.noOfBoxes,
                SZ04:(parseInt(d.SZ04)||0)*entryDetails.noOfBoxes,
                SZ05:(parseInt(d.SZ05)||0)*entryDetails.noOfBoxes,
                SZ06:(parseInt(d.SZ06)||0)*entryDetails.noOfBoxes,
                SZ07:(parseInt(d.SZ07)||0)*entryDetails.noOfBoxes,
                SZ08:(parseInt(d.SZ08)||0)*entryDetails.noOfBoxes,
                SZ09:(parseInt(d.SZ09)||0)*entryDetails.noOfBoxes,
                SZ10:(parseInt(d.SZ10)||0)*entryDetails.noOfBoxes,
                SZ11:(parseInt(d.SZ11)||0)*entryDetails.noOfBoxes,
                SZ12:(parseInt(d.SZ12)||0)*entryDetails.noOfBoxes,
            }

        totalQtyByIds[key] = sumObj
    })
console.log(totalQtyByIds, totalQuantities)

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
                
                
             }

             await BoxItem.destroy(
                {
                    where:{
                       entryId:id
                    },
                    transaction:t
                }
            )
            await entryModel.destroy(
                {
                    where:{
                        id,
                    },
                    transaction:t
                }
            )
            await barcodeModel.destroy({
                where:{
                    entryId:id
                },
                transaction:t
            })
      
                // If the execution reaches this line, the transaction has been committed successfully
            // `result` is whatever was returned from the transaction callback (the `user`, in this case)
      
        }
      catch (error) {
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
},
update: async(req, res) =>{
    const user = req.user;
    const {boxData, weightData, seqId} = req.body;
    const oldBoxData = await BoxItem.findAll({
        where:{
            entryId:seqId

        }
    })
    const oldValues = oldBoxData.map(ob => {
        return {
        SZ01:parseInt(ob.SZ01)||0,
        SZ02:parseInt(ob.SZ02)||0,
        SZ03:parseInt(ob.SZ03)||0,
        SZ04:parseInt(ob.SZ04)||0,
        SZ05:parseInt(ob.SZ05)||0,
        SZ06:parseInt(ob.SZ06)||0,
        SZ07:parseInt(ob.SZ07)||0,
        SZ08:parseInt(ob.SZ08)||0,
        SZ09:parseInt(ob.SZ09)||0,
        SZ10:parseInt(ob.SZ10)||0,
        SZ11:parseInt(ob.SZ11)||0,
        SZ12:parseInt(ob.SZ12)||0,}
        })
        const newValues = boxData.map(ob => {
            return {
            SZ01:ob.SZ01,
            SZ02:ob.SZ02,
            SZ03:ob.SZ03,
            SZ04:ob.SZ04,
            SZ05:ob.SZ05,
            SZ06:ob.SZ06,
            SZ07:ob.SZ07,
            SZ08:ob.SZ08,
            SZ09:ob.SZ09,
            SZ10:ob.SZ10,
            SZ11:ob.SZ11,
            SZ12:ob.SZ12,}
            })
    let difValue = [];
    newValues.map((ob,i)=>{
        let cb = oldValues[i];
        let result ={};
        for (var key in ob) {
            if (cb.hasOwnProperty(key)) {
              result[key] = (ob[key] - cb[key]) * weightData.noOfBoxes;
            } else {
              result[key] = ob[key] * weightData.noOfBoxes;
            }
          }

        difValue.push(result) 
    })

    for(var i in boxData){
       
        let purchaseOrderId = boxData[i].purchaseOrderId
        await entryModel.update({
            NetWt:  weightData.NetWt,
            GrossWt:weightData.GrossWt,
            Length: weightData.Length,
            Width:  weightData.Width,
            Height: weightData.Height,
            ShipNo: weightData.ShipNo,
        },{
            where:{
                id:seqId
            }
        })
        await BoxItem.update({
            ...newValues[i]
        },{
            where:{
                entryId:seqId,
                purchaseOrderId
            }
        });

        await packedQuantityModel.increment({
            ...difValue[i],
            TOT_QTY:countTotal(difValue[i])
            
        },{
            where:{
                purchaseOrderId
            }
        })

        await balanceQuantityModel.decrement({
            ...difValue[i],
            TOT_QTY:countTotal(difValue[i])
            
        },{
            where:{
                purchaseOrderId
            }
        })

    }
    console.log(oldBoxData,oldValues,newValues,boxData)
    res.status(200).json({
        message:'Updated Successfully!'
    })
}
}