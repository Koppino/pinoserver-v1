const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')
const peopleController = require('../controllers/PeopleController')

router.get('/', ensureAuthenticated , peopleController.getPeople);


module.exports = router