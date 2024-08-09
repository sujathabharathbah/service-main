const express = require('express');
const router = express.Router();
const capabilitiesController = require('../controllers/capabilities');

/**
 * Capabilities routes
 */

// Get all capabilities for a specific backend
router.get('/:backendId', capabilitiesController.getAll);

module.exports = router;
