const express = require("express");
const {protect} = require("../middleware/protect");


const router = express.Router();
const service = require("../controllers/csvController");

// user

router.get('/convert',protect,service.convert);


module.exports = router;


