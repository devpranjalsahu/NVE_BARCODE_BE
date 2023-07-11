const express = require("express");
const {isAdmin} = require("../middleware/protect");


const router = express.Router();
const service = require("../controllers/userController");
const adminService = require("../controllers/adminController");

// user
router.post('/login', adminService.login);
router.get('/getAllUsers',isAdmin,service.getAll);
router.get('/getUser', isAdmin, service.get);
router.post('/createUser',isAdmin,service.create);
router.post('/createAdmin',adminService.create);
router.post('/updateUser',isAdmin,service.update);
router.get('/loadLots',isAdmin,adminService.loadLots);
router.post('/loadPOs',adminService.loadPOs);
router.get('/getPoFiles',adminService.getPOFiles);


module.exports = router;