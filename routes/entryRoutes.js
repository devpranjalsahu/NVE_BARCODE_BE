const express = require("express");
const {protect} = require("../middleware/protect");


const router = express.Router();
const service = require("../controllers/entryController");

// user

router.post('/new',protect,service.new);
router.get('/getAll',protect,service.getAll);
router.get('/get',protect,service.get);
// router.get('/delete',protect,service.delete);
// router.post('/getFilteredPurchaseOrders',protect,service.getFilteredPurchaseOrders);


module.exports = router;
