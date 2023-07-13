const _ = require("underscore");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");

const db = require("../config/db");

module.exports = {
  convert: async (req, res) => {
    const user = req.user;
    let date = Date.now().toString();
    const filepath = `../${user.username}${Date.now().toString()}.csv`;
    //   							Company
    const csvWriter = createCsvWriter({
      path: filepath,
      header: [
        { id: "entry_id", title: "SequenceId" },
        { id: "barcode_id", title: "BarcodeId" },
        { id: "entry_ShipNo", title: "Shipment# " },
        { id: "PO", title: " PO" },
        { id: "SEA", title: "Sea" },
        { id: "STY", title: "Sty" },
        { id: "LOT", title: "Lot" },
        { id: "CLR", title: "Clr" },
        { id: "DIM", title: "Dim" },
        { id: "boxitems_TOT_QTY", title: "Tot_Qty" },
        { id: "boxitems_SZ01", title: "SZ01" },
        { id: "boxitems_SZ02", title: " SZ02" },
        { id: "boxitems_SZ03", title: " SZ03" },
        { id: "boxitems_SZ04", title: " SZ04" },
        { id: "boxitems_SZ05", title: " SZ05" },
        { id: "boxitems_SZ06", title: " SZ06" },
        { id: "boxitems_SZ07", title: " SZ07" },
        { id: "boxitems_SZ08", title: " SZ08" },
        { id: "boxitems_SZ09", title: " SZ09" },
        { id: "boxitems_SZ10", title: " SZ10" },
        { id: "boxitems_SZ11", title: " SZ11" },
        { id: "boxitems_SZ12", title: " SZ12" },
        { id: "entry_NetWt", title: "NetWt" },
        { id: "entry_GrossWt", title: "GrossWt" },
        { id: "entry_Length", title: "Length" },
        { id: "entry_Width", title: "Width" },
        { id: "entry_Height", title: "Height" },
        { id: "company", title: "Company" },
      ],
    });
    const entries = await db.query(
      `SELECT * FROM (SELECT
    barcode.id AS barcode_id,
    barcode.entryId AS barcode_entryId,
    barcode.createdAt AS barcode_createdAt,
    barcode.updatedAt AS barcode_updatedAt,
    b.id AS boxitems_id,
    b.entryId AS boxitems_entryId,
    b.purchaseOrderId AS boxitems_purchaseOrderId,
    b.TOT_QTY AS boxitems_TOT_QTY,
    b.SZ01 AS boxitems_SZ01,
    b.SZ02 AS boxitems_SZ02,
    b.SZ03 AS boxitems_SZ03,
    b.SZ04 AS boxitems_SZ04,
    b.SZ05 AS boxitems_SZ05,
    b.SZ06 AS boxitems_SZ06,
    b.SZ07 AS boxitems_SZ07,
    b.SZ08 AS boxitems_SZ08,
    b.SZ09 AS boxitems_SZ09,
    b.SZ10 AS boxitems_SZ10,
    b.SZ11 AS boxitems_SZ11,
    b.SZ12 AS boxitems_SZ12,
    entry.id AS entry_id,
    entry.PO AS entry_PO,
    entry.STY AS entry_STY,
    entry.noOfBoxes AS entry_noOfBoxes,
    entry.username AS entry_username,
    entry.NetWt AS entry_NetWt,
    entry.GrossWt AS entry_GrossWt,
    entry.Length AS entry_Length,
    entry.Width AS entry_Width,
    entry.Height AS entry_Height,
    entry.ShipNo AS entry_ShipNo
  FROM barcodes AS barcode
  RIGHT OUTER JOIN (
    SELECT
      boxitems.id,
      boxitems.entryId,
      boxitems.purchaseOrderId,
      boxitems.SZ01,
      boxitems.SZ02,
      boxitems.SZ03,
      boxitems.SZ04,
      boxitems.SZ05,
      boxitems.SZ06,
      boxitems.SZ07,
      boxitems.SZ08,
      boxitems.SZ09,
      boxitems.SZ10,
      boxitems.SZ11,
      boxitems.SZ12,
      boxitems.TOT_QTY
    FROM boxitems
  ) AS b ON barcode.entryId = b.entryId
  LEFT JOIN entries AS entry ON barcode.entryId = entry.id) as result LEFT  JOIN purchaseOrders AS po ON result.boxitems_purchaseOrderId = po.id WHERE entry_username = '${user.username}' ORDER BY result.barcode_id;
 `,
      { raw: true }
    );

    if (entries[0].length === 0)
      return res.status(400).json({
        message: "No entries found!",
      });

    csvWriter
      .writeRecords(
        entries[0].map((x) => {
          return { ...x, company: user.company };
        })
      )
      .then(() => {
        console.log("...Done");
        return res.download(
          path.join(__dirname, "../", filepath),
          `${user.username}${Date.now().toString()}.csv`
        );
      });

    // res.status(200).json({boxes:entries[0]})
  },
};

// SequenceId BarcodeId Ship# PO	SEA	STY	LOT	CLR	DIM	TOT_QTY	SZ01
// SZ02	SZ03	SZ04	SZ05	SZ06	SZ07	SZ08	SZ09	SZ10
// SZ11	SZ12	NetWt	GrossWt	Length	Width	Height	Company
