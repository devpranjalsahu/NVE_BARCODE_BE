

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

    // SequenceId BarcodeId Ship# PO	SEA	STY	LOT	CLR	DIM	TOT_QTY	SZ01	
    // SZ02	SZ03	SZ04	SZ05	SZ06	SZ07	SZ08	SZ09	SZ10	
    // SZ11	SZ12	NetWt	GrossWt	Length	Width	Height	Company
//     const csvWriter = createCsvWriter({
//         path: './xcv.csv',
//         header: [
//             {id:"SequenceId", title:"SequenceId"},      
//              {id: "barcodeId" , title :"BarcodeId"},
//              {id: "" , title :"Shipment# "},
//              {id: "purchaseOrder.PO" , title :" PO"},
//              {id: " " , title :"Sea"},
//              {id: " " , title :"Sty"},    
//              {id: " " , title :"Lot"},
//              {id: " " , title :"Clr"},
//              {id: " " , title :"Dim"},
//              {id: " " , title :"Tot_Qty"},
//              {id: " " , title :"SZ01"},
//              {id: " " , title :" SZ02"},
//              {id: " " , title :" SZ03"},
//              {id: " " , title :" SZ04"},
//              {id: " " , title :" SZ05"},
//              {id: " " , title :" SZ06"},
//              {id: " " , title :" SZ07"},
//              {id: " " , title :" SZ08"},
//              {id: " " , title :" SZ09"},
//              {id: " " , title :" SZ10"},
//              {id: " " , title :" SZ11"},
//              {id: " " , title :" "},
//              {id: " " , title :" "},
//              {id: " " , title :" "},
// v

//         ]
//     });
   
    const entries = await entryModel.findAll({
        where:{
            username:user.username
        },
        // raw:true,
        attributes:['shipmentSequenceId']
    })
    const boxes =  await barcodeModel.findAll({
        where:{
            shipmentSequenceId:entries.map(x=>x.shipmentSequenceId)
        },
        raw:true,
    })
    console.log(boxes)
    // csvWriter.writeRecords(boxes)       // returns a promise
    // .then(() => {
    //     console.log('...Done');
    // }).catch(e=>console.log(e,'e'));
    res.status(200).json({
        boxes
    })
},
}


// SequenceId BarcodeId Ship# PO	SEA	STY	LOT	CLR	DIM	TOT_QTY	SZ01	
// SZ02	SZ03	SZ04	SZ05	SZ06	SZ07	SZ08	SZ09	SZ10	
// SZ11	SZ12	NetWt	GrossWt	Length	Width	Height	Company