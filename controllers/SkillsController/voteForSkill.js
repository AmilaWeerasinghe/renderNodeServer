const Skill = require('../../models/Skill');

const voteForSkill =  async ( req ,res ) => {
    try {
        const { skillId, userId } = req.body;
        console.log('POST /api/skills/vote', skillId);

        // Find the skill by id
        const skill = await Skill.find({ name: skillId });

        if ( skill.length === 0 ) {
            let votes=1;
            Skill.create({ name: skillId, votedUsers: [userId], votes });
        } else {
            //check if user already voted
            if ( skill[0].votedUsers.includes(userId)) {
                res.status(400).json({ error: 'User already voted for this skill'});
                return;
            }

            // if not votes update the votes and add the user to votedUsers
            let votes = skill[0].votes + 1;
            let votedUsers = skill[0].votedUsers;
            //push the user id to voted users
            votedUsers.push(userId);
            //update the skill with new votes and voted users
            await Skill.updateOne({ name: skillId }, { votes, votedUsers });
            console.log('Skill updated:', skill);
            res.status(200).json({ message: 'Voted successfully'});
        }
    } catch ( err ) {
        console.error('Error voting for skill:', err.message);
        res.status(500).json({ error: err.message});
    }
}

module.exports = voteForSkill;