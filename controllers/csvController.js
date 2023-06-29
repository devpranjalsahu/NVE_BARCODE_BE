

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

    //   							Company
    const csvWriter = createCsvWriter({
        path: './xcv.csv',
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
   const entries = await db.query(`SELECT
   *
FROM
   "barcodes" AS barcode
RIGHT OUTER JOIN (
    SELECT *
    FROM "boxitems"
    INNER JOIN "purchaseOrders" ON "boxitems"."purchaseOrderId" = "purchaseOrders"."id"
  ) AS b ON
   barcode."entryId" = "b"."entryId"
   LEFT JOIN "entries" AS entry ON barcode."entryId" = entry."id";`, {raw:true})
    

   csvWriter.writeRecords(entries[0].map(x=>{
    return {...x, company:user.company}
})) 
   .then(() => {
       console.log('...Done');
   });



    res.status(200).json({
        boxes:entries[0].map(x=>{
            return {...x, company:user.company}
        })
    })
},
}


// SequenceId BarcodeId Ship# PO	SEA	STY	LOT	CLR	DIM	TOT_QTY	SZ01	
// SZ02	SZ03	SZ04	SZ05	SZ06	SZ07	SZ08	SZ09	SZ10	
// SZ11	SZ12	NetWt	GrossWt	Length	Width	Height	Company