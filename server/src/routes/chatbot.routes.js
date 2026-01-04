const express = require('express');
const router = express.Router();

const { asyncHandler, authUser } = require('../auth/checkAuth');

const chatbotController = require('../controllers/chatbot.controller');

router.post('/create', authUser, asyncHandler(chatbotController.createMessage));
router.get('/messages', authUser, asyncHandler(chatbotController.getMessages));

module.exports = router;
