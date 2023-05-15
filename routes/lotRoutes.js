const express = require("express");
const {protect} = require("../middleware/protect");


const router = express.Router();
const service = require("../controllers/lotController");

// user

router.get('/getOne',protect,service.getOne);
// router.post('/getFilteredPurchaseOrders',protect,service.getFilteredPurchaseOrders);


module.exports = router;
