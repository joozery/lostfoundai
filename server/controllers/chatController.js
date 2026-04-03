const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Send a message
// @route   POST /api/chat
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
    const { receiverId, content, itemId } = req.body;

    if (!receiverId || !content) {
        res.status(400);
        throw new Error('Please provide receiver and content');
    }

    const message = await Message.create({
        sender: req.user.id,
        receiver: receiverId,
        content,
        item: itemId
    });

    if (message) {
        const fullMessage = await Message.findById(message._id)
            .populate('sender', 'firstname lastname avatar')
            .populate('receiver', 'firstname lastname avatar');
        res.status(201).json(fullMessage);
    } else {
        res.status(400);
        throw new Error('Failed to send message');
    }
});

// @desc    Get chat history between two users
// @route   GET /api/chat/:userId
// @access  Private
const getChatHistory = asyncHandler(async (req, res) => {
    const messages = await Message.find({
        $or: [
            { sender: req.user.id, receiver: req.params.userId },
            { sender: req.params.userId, receiver: req.user.id }
        ]
    })
        .sort({ createdAt: 1 })
        .populate('sender', 'firstname lastname avatar')
        .populate('receiver', 'firstname lastname avatar');

    res.status(200).json(messages);
});

// @desc    Get all conversations for current user
// @route   GET /api/chat/conversations
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
    // This is a simplified version: get unique users from messages
    const sentTo = await Message.find({ sender: req.user.id }).distinct('receiver');
    const receivedFrom = await Message.find({ receiver: req.user.id }).distinct('sender');

    const userIds = [...new Set([...sentTo, ...receivedFrom])];

    const conversations = await Promise.all(userIds.map(async (userId) => {
        const lastMessage = await Message.findOne({
            $or: [
                { sender: req.user.id, receiver: userId },
                { sender: userId, receiver: req.user.id }
            ]
        }).sort({ createdAt: -1 }).populate('sender receiver', 'firstname lastname avatar');

        const otherUser = lastMessage.sender._id.toString() === req.user.id.toString()
            ? lastMessage.receiver
            : lastMessage.sender;

        return {
            user: otherUser,
            lastMessage: lastMessage.content,
            updatedAt: lastMessage.createdAt
        };
    }));

    // Sort by most recent
    conversations.sort((a, b) => b.updatedAt - a.updatedAt);

    res.status(200).json(conversations);
});

module.exports = {
    sendMessage,
    getChatHistory,
    getConversations
};
