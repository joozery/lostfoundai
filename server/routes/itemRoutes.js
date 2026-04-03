const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = require('../config/storage');
const {
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
    aiSearch
} = require('../controllers/itemController');

const { protect } = require('../middleware/authMiddleware');

const upload = multer({ storage });

router.post('/ai-search', aiSearch);

router.route('/')
    .get(getItems)
    .post(protect, upload.array('images', 5), createItem);

router.route('/:id')
    .get(getItem)
    .put(protect, updateItem)
    .delete(protect, deleteItem);

module.exports = router;
