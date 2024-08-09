const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email');

/**
 * Email routes
 */

// Send email
router.post('/sendEmail', emailController.sendEmail);

module.exports = router;
