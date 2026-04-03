const express = require('express');
const router = express.Router();
const {
    getStats,
    getAllUsers,
    updateUser
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getStats);
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id', protect, admin, updateUser);

module.exports = router;
