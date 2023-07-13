const express = require("express");
const { isAdmin } = require("../middleware/protect");
const boxMasterController = require("../controllers/boxMasterController");

const router = express.Router();
const service = require("../controllers/userController");
const adminService = require("../controllers/adminController");

// user
router.post("/login", adminService.login);
router.get("/getAllUsers", isAdmin, service.getAll);
router.get("/getAllBoxMasters", boxMasterController.getAll);
router.get("/getBoxMaster", boxMasterController.getOne);
router.get("/getUser", isAdmin, service.get);
router.post("/createUser", isAdmin, service.create);
router.post("/createBoxMaster", isAdmin, boxMasterController.create);
router.post("/updateBoxMaster", isAdmin, boxMasterController.update);
router.get("/deleteUser", isAdmin, service.delete);
router.post("/createAdmin", adminService.create);
router.post("/updateUser", isAdmin, service.update);
router.get("/loadLots", isAdmin, adminService.loadLots);
router.post("/loadPOs", adminService.loadPOs);
router.get("/getPoFiles", adminService.getPOFiles);

module.exports = router;
