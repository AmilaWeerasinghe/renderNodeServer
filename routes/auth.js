const express = require('express');
const { googleAuthController } = require('../controllers/AuthController')

const router = express.Router(); // like a mini express server to handle routes in different files in modular way

router.get('/google', googleAuthController.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', googleAuthController.authenticate('google', { failureRedirect: '/'}), (req, res) => {
    console.log('Successfully authenticated',req.user.token);
    res.redirect(`amilaweerasinghe.github.io/authenticate?token=${req.user.token}`);
})

module.exports = router;