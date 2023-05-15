const express = require("express");
const router = express.Router();
const service = require("../controllers/userController");
const adminService = require("../controllers/adminController");

// user

router.get('/getAllUsers',service.getAll);
router.post('/createUser',service.create);
router.post('/updateUser',service.update);
// router.get('/loadLots',adminService.loadLots);
router.get('/loadPOs',adminService.loadPOs);


module.exports = router;
