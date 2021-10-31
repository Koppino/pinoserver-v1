const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");
const postController = require('../controllers/PostController')
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

router.get('/', ensureAuthenticated ,postController.getPostsView);

router.get('/add', ensureAuthenticated, postController.getAddPostView)
router.post('/add', ensureAuthenticated, postController.addPost)

router.get('/get/:_id', ensureAuthenticated, postController.getPostById)
router.post('/update/:_id', ensureAuthenticated, postController.updatePostById)
module.exports = router