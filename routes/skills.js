const express = require('express');
const { getAllSkills, voteForSkill } = require('../controllers/SkillsController');

const router = express.Router(); // Its like a mini express app to handle routes in different files in modular way

// Route to get all skills
router.get('/' , getAllSkills);

//Route to vote for a skill
router.post('/vote',voteForSkill)

module.exports = router;