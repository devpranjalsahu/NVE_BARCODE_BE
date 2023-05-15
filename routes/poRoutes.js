const express = require("express");
const {protect} = require("../middleware/protect");


const router = express.Router();
const service = require("../controllers/poController");

// user

router.get('/getPurchaseOrders',protect,service.getPurchaseOrders);
router.post('/getFilteredPurchaseOrders',protect,service.getFilteredPurchaseOrders);


module.exports = router;
