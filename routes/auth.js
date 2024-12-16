const express = require('express');
const { googleAuthController } = require('../controllers/AuthController')

const router = express.Router(); // like a mini express server to handle routes in different files in modular way

router.get('/google', googleAuthController)

module.exports = router;