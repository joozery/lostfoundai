const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    type: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['electronics', 'clothing', 'wallet', 'bag', 'keys', 'documents', 'pets', 'jewelry', 'glasses', 'stationery', 'health', 'sports', 'music', 'tools', 'toy', 'others']
    },
    location: {
        type: String,
        required: [true, 'Please add location details']
    },
    date: {
        type: Date,
        required: [true, 'Please add date']
    },
    images: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ['open', 'resolved', 'closed'],
        default: 'open'
    },
    aiTags: [{
        type: String
    }],
    aiDescription: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);
