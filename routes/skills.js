const express = require('express');
const { getAllSkills } = require('../controllers/SkillsController');

const router = express.Router(); // Its like a mini express app to handle routes in different files in modular way

// Route to get all skills
router.get('/' , getAllSkills);

module.exports = router;