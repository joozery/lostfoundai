const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getChatHistory,
    getConversations
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/:userId', protect, getChatHistory);

module.exports = router;
