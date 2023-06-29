

const _ = require('underscore');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const purchaseOrderModel = require('../models/purchaseOrderModel');
const balanceQuantityModel = require('../models/balanceQuantityModel');
const packedQuantityModel = require('../models/packedQuantityModel');
const barcodeModel = require('../models/barcodeModel');
const boxModel = require('../models/boxModel');
const entryModel = require('../models/entryModel');
const db = require('../config/db');



module.exports ={

convert: async (req, res) => {
    const user = req.user;
    const path = `./${user.username}${Date.now().csv}`
    //   							Company
    const csvWriter = createCsvWriter({
        path,
        header: [
            {id:"entryId", title:"SequenceId"},      
             {id: "id" , title :"BarcodeId"},
             {id: "ShipNo" , title :"Shipment# "},
             {id: "purchaseOrder.PO" , title :" PO"},
             {id: "SEA" , title :"Sea"},
             {id: "STY" , title :"Sty"},    
             {id: "LOT" , title :"Lot"},
             {id: "CLR" , title :"Clr"},
             {id: "DIM" , title :"Dim"},
             {id: "TOT_QTY" , title :"Tot_Qty"},
             {id: "SZ01",  title :"SZ01"},
             {id: "SZ02" , title :" SZ02"},
             {id: "SZ03" , title :" SZ03"},
             {id: "SZ04" , title :" SZ04"},
             {id: "SZ05" , title :" SZ05"},
             {id: "SZ06" , title :" SZ06"},
             {id: "SZ07" , title :" SZ07"},
             {id: "SZ08" , title :" SZ08"},
             {id: "SZ09" , title :" SZ09"},
             {id: "SZ10" , title :" SZ10"},
             {id: "SZ11" , title :" SZ11"},
             {id: "SZ12" , title :" SZ12"},
             {id: "NetWt" , title :"NetWt"},
             {id: "GrossWt" , title :"GrossWt"},
             {id: "Length" , title :"Length"},
             {id: "Width" , title :"Width"},
             {id: "Height" , title :"Height"},
             {id: "company" , title :"Company"},
        ]
    });
//    const entries = await db.query(`SELECT
//    barcode.id AS barcode_id,
//    barcode.entryId AS barcode_entryId,
//    barcode.createdAt AS barcode_createdAt,
//    barcode.updatedAt AS barcode_updatedAt,
//    b.id AS boxitems_id,
//    b.entryId AS boxitems_entryId,
//    b.purchaseOrderId AS boxitems_purchaseOrderId,
//    b.SZ01 AS boxitems_SZ01,
//    b.SZ02 AS boxitems_SZ02,
//    b.SZ03 AS boxitems_SZ03,
//    b.SZ04 AS boxitems_SZ04,
//    b.SZ05 AS boxitems_SZ05,
//    b.SZ06 AS boxitems_SZ06,
//    b.SZ07 AS boxitems_SZ07,
//    b.SZ08 AS boxitems_SZ08,
//    b.SZ09 AS boxitems_SZ09,
//    b.SZ10 AS boxitems_SZ10,
//    b.SZ11 AS boxitems_SZ11,
//    b.SZ12 AS boxitems_SZ12,
//    entry.id AS entry_id,
//    entry.PO AS entry_PO,
//    entry.STY AS entry_STY,
//    entry.noOfBoxes AS entry_noOfBoxes,
//    entry.username AS entry_username,
//    entry.NetWt AS entry_NetWt,
//    entry.GrossWt AS entry_GrossWt,
//    entry.Length AS entry_Length,
//    entry.Width AS entry_Width,
//    entry.Height AS entry_Height,
//    entry.ShipNo AS entry_ShipNo,
//    entry.createdAt AS entry_createdAt,
//    entry.updatedAt AS entry_updatedAt
//  FROM barcodes AS barcode
//  RIGHT OUTER JOIN (
//    SELECT
//      boxitems.id,
//      boxitems.entryId,
//      boxitems.purchaseOrderId,
//      boxitems.SZ01,
//      boxitems.SZ02,
//      boxitems.SZ03,
//      boxitems.SZ04,
//      boxitems.SZ05,
//      boxitems.SZ06,
//      boxitems.SZ07,
//      boxitems.SZ08,
//      boxitems.SZ09,
//      boxitems.SZ10,
//      boxitems.SZ11,
//      boxitems.SZ12
//    FROM boxitems
//    INNER JOIN purchaseOrders ON boxitems.purchaseOrderId = purchaseOrders.id
//  ) AS b ON barcode.entryId = b.entryId
//  LEFT JOIN entries AS entry ON barcode.entryId = entry.id;
//  `, {raw:true})

    const entries = await barcodeModel.findAll({
        include:[
            {
                model:boxModel,
                right:true,
                required:false,
                include:[{model:entryModel},{
                    model:purchaseOrderModel
                }]
            },
        ],raw:true
    })


//    csvWriter.writeRecords(entries[0].map(x=>{
//     return {...x, company:user.company}
// })) 
//    .then(() => {
//        console.log('...Done');
//    });


res.status(200).json({boxes:entries[0]})
    // res.sendFile(path)
},
}


// SequenceId BarcodeId Ship# PO	SEA	STY	LOT	CLR	DIM	TOT_QTY	SZ01	
// SZ02	SZ03	SZ04	SZ05	SZ06	SZ07	SZ08	SZ09	SZ10	
// SZ11	SZ12	NetWt	GrossWt	Length	Width	Height	Company