const express = require("express");
const router = express.Router();
const service = require("../controllers/authController");

// user

router.post('/login',service.login);


module.exports = router;
