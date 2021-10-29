const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");
const mainController = require('../controllers/MainController.js')
const AccountController = require('../controllers/AccountController')
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

router.get("/",ensureAuthenticated, AccountController.getAccountView);


module.exports = router;
