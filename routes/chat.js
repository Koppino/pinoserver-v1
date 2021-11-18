const express = require("express");
const router = express.Router();
const chatController = require('../controllers/ChatController');
const {ensureAuthenticated, forardAuthenticated} = require('../config/auth')

router.get("/", ensureAuthenticated, chatController.getChatView);

module.exports = router