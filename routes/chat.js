const express = require("express");
const router = express.Router();
const chatController = require('../controllers/ChatController');
const {ensureAuthenticated, forardAuthenticated} = require('../config/auth')

router.get("/", ensureAuthenticated, chatController.getChatView);
router.get('/all', ensureAuthenticated, chatController.getChatWithAll)
router.get('/:uid',ensureAuthenticated, chatController.getChatViewWithFriend)

router.post('/:uid', ensureAuthenticated, chatController.postMessage)

module.exports = router