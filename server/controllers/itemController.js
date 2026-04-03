const asyncHandler = require('express-async-handler');
const Item = require('../models/Item');
const { analyzeItemImage } = require('../utils/aiService');

// @desc    Create new item (Lost/Found)
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
    const { title, description, type, category, location, date } = req.body;

    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error('Please upload at least one image');
    }

    const images = req.files.map(file => file.path); // Cloudinary URL

    const item = await Item.create({
        user: req.user.id,
        title,
        description,
        type,
        category,
        location,
        date,
        images,
        status: 'open'
    });

    // Run AI analysis (Trigger in background to keep UI snappy, or await if you want immediate results)
    // For now, let's await it to show the AI power on the first load!
    if (images.length > 0) {
        try {
            const aiResult = await analyzeItemImage(images[0]);
            if (aiResult) {
                item.aiTags = aiResult.tags;
                item.aiDescription = aiResult.description;
                await item.save();
            }
        } catch (err) {
            console.error("Delayed AI analysis failed:", err);
        }
    }

    res.status(201).json(item);
});

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
    const { type, category, search, user, status } = req.query;
    let query = {};

    // Default status to 'open' unless specified (e.g. 'all' or 'closed')
    if (status) {
        if (status !== 'all') {
            query.status = status;
        }
    } else {
        query.status = 'open';
    }

    if (type) {
        query.type = type;
    }
    if (category) {
        query.category = category;
    }
    if (user) {
        query.user = user;
    }
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } }
        ];
    }

    const items = await Item.find(query).sort({ createdAt: -1 });

    res.status(200).json(items);
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
const getItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id).populate('user', 'firstname lastname avatar email');

    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }

    res.status(200).json(item);
});

// @desc    Update item status
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Ensure logged in user matches the item user or is admin
    if (item.user.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedItem);
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }

    // Ensure logged in user matches the item user or is admin
    if (item.user.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('User not authorized');
    }

    await item.deleteOne();

    res.status(200).json({ id: req.params.id });
});

// @desc    AI-powered search for items
// @route   POST /api/items/ai-search
// @access  Public
const aiSearch = asyncHandler(async (req, res) => {
    const { query } = req.body;

    if (!query) {
        res.status(400);
        throw new Error('Please provide a search query');
    }

    // Fetch all open items to let AI filter them
    const items = await Item.find({ status: 'open' })
        .populate('user', 'firstname lastname avatar')
        .sort({ createdAt: -1 });

    if (items.length === 0) {
        return res.status(200).json({
            answer: "ขออภัยครับ ตอนนี้ยังไม่มีรายการสิ่งของในระบบเลยครับ",
            matches: []
        });
    }

    try {
        console.log("AI Search Triggered with query:", query);
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const itemsContext = items.map(item => ({
            id: item._id,
            title: item.title,
            description: item.description,
            type: item.type,
            category: item.category,
            location: item.location,
            aiTags: item.aiTags?.join(', ')
        }));

        const prompt = `You are a helpful Lost & Found AI Assistant named "L&F AI Helper". 
        User Question: "${query}"
        
        Available Items in Database: ${JSON.stringify(itemsContext)}
        
        Task:
        1. Identify which items from the database might match the user's query. Better to include multiple possible matches if they are relevant.
        2. Respond in a friendly Thai language.
        3. If there are matches, list them and explain why they match briefly. Use a polite tone ("ครับ/ค่ะ").
        4. If no obvious matches, suggest what the user should do next (e.g., "ลองพิมพ์รายละเอียดให้ชัดเจนขึ้น หรือสร้างประกาศของหายไว้ในระบบนะครับ").
        5. Return ONLY a valid JSON object. DO NOT add any markdown formatting or extra text.
        
        JSON Structure:
        {
          "answer": "Your friendly Thai response here...",
          "matchIds": ["list", "of", "matching", "item", "ids"]
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (!response || !response.candidates || response.candidates.length === 0) {
            return res.status(200).json({
                answer: "ขออภัยครับ ผมไม่สามารถให้ข้อมูลเกี่ยวกับเรื่องนี้ได้เนื่องจากข้อจำกัดด้านความปลอดภัยของระบบครับ",
                matches: []
            });
        }

        let aiText = response.text();
        console.log("Raw AI Response:", aiText);

        // Remove markdown formatting if present
        aiText = aiText.replace(/```json|```/g, "").trim();

        const jsonMatch = aiText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            let aiResponse;
            try {
                aiResponse = JSON.parse(jsonMatch[0]);
            } catch (pErr) {
                console.error("JSON Parse Error:", pErr, "Raw text:", jsonMatch[0]);
                return res.status(200).json({
                    answer: "ขออภัยครับ ผมประมวลผลข้อมูลผิดพลาดเล็กน้อย ลองถามใหม่อีกครั้งนะครับ",
                    matches: []
                });
            }

            // Filter the actual item objects for the frontend
            const matchedItems = items.filter(item =>
                aiResponse.matchIds && Array.isArray(aiResponse.matchIds) &&
                aiResponse.matchIds.includes(item._id.toString())
            );

            res.status(200).json({
                answer: aiResponse.answer || "นี่คือรายการที่ผมหาพบครับ",
                matches: matchedItems
            });
        } else {
            res.status(200).json({
                answer: "ขออภัยครับ ผมไม่สามารถประมวลผลคำค้นหาได้ในขณะนี้ ลองใหม่อีกครั้งนะครับ",
                matches: []
            });
        }
    } catch (error) {
        console.error("AI Search Error:", error);
        res.status(500).json({
            message: "เกิดข้อผิดพลาดในการค้นหาด้วย AI",
            details: error.message
        });
    }
});

module.exports = {
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
    aiSearch
};
