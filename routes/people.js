const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");
const mainController = require('../controllers/MainController.js')
const peopleController = require('../controllers/PeopleController.js')
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

router.get('/', ensureAuthenticated ,peopleController.getPeople);

module.exports = router;
