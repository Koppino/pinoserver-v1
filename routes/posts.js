const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");
const postController = require('../controllers/PostController')
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

router.get('/', ensureAuthenticated ,postController.getPostsView);

module.exports = router