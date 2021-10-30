const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");
const mainController = require('../controllers/MainController.js')
const personController = require('../controllers/PeopleController')
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

router.get('/', ensureAuthenticated ,personController.getPeople);

router.get('/add', ensureAuthenticated, personController.getAddView)
router.post('/add', ensureAuthenticated, personController.addPerson)

module.exports = router