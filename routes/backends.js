const express = require('express');
const router = express.Router();
const backendsController = require('../controllers/backends');

/**
 * Backend routes
 */

// Get all backends
router.get('/', backendsController.getAll);

module.exports = router;
