const Skill = require('../../models/Skill');

const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        console.log('GET /api/skills',JSON.stringify(skills));
        res.json(skills);
    } catch (err) {
        console.error('Error fetching skills:', err.message);
        res.status(500).json({error: err.message})
    }
}

module.exports = getAllSkills;