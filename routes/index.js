const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");
const mainController = require('../controllers/MainController.js')
const authController = require('../controllers/AuthController.js')
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

router.get("/", ensureAuthenticated ,mainController.getDashboard);

router.get('/login', authController.getLogin)
router.post('/login', authController.doLogin)

router.post('/register',forwardAuthenticated, authController.doRegister)
router.get('/register', forwardAuthenticated,authController.getRegister)

router.get('/dashboard', ensureAuthenticated , mainController.getDashboard)

module.exports = router;
