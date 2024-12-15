const express = require('express');
const Skill = require('../models/Skill');

const router = express.Router(); // Its like a mini express app to handle routes in different files in modular way

// Route to get all skills
router.get('/' , async (req, res) => {
    try {
        const skills = await Skill.find();
        console.log('GET /api/skills',JSON.stringify(skills));
        res.json(skills);
    } catch (err) {
        console.error('Error fetching skills:', err.message);
        res.status(500).json({error: err.message})
    }
})

module.exports = router;