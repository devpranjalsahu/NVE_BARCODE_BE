const express = require("express");
const {isAdmin} = require("../middleware/protect");


const router = express.Router();
const service = require("../controllers/userController");
const adminService = require("../controllers/adminController");

// user
router.post('/login', adminService.login);
router.get('/getAllUsers',service.getAll);
router.post('/createUser',isAdmin,service.create);
router.post('/createAdmin',adminService.create);
router.post('/updateUser',isAdmin,service.update);
router.get('/loadLots',adminService.loadLots);
router.get('/loadPOs',adminService.loadPOs);


module.exports = router;