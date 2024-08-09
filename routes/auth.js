const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

/**
 * Authentication routes
 */

// Authorize a user
router.post('/', authController.authorizeUser);

// Get ACS token
router.post('/acsToken', authController.getACSToken);

// Get session information
router.get('/session/:sessionId', authController.getSession);

// Logout user
router.post('/logout', authController.logout);

module.exports = router;
