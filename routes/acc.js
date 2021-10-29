const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");
const mainController = require('../controllers/MainController.js')
const accController = require('../controllers/AccountController.js')
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

router.get("/",ensureAuthenticated, accController.getAcc);


module.exports = router;
