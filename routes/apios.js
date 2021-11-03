const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const appIosController = require('../controllers/AppIosController')


router.get('/getPeople/:user', appIosController.getPeopleByMyId);


module.exports = router;
