const express = require("express");
const {protect} = require("../middleware/protect");


const router = express.Router();
const service = require("../controllers/entryController");

// user

router.post('/new',protect,service.new);
// router.post('/getFilteredPurchaseOrders',protect,service.getFilteredPurchaseOrders);


module.exports = router;
