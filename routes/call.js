const express = require('express');
const router = express.Router();
const callController = require('../controllers/call');

/**
 * Call management routes
 */

// Initiate a new call
router.post('/', callController.makeCall);

// Get call data
router.get('/:callId', callController.getCallData);

// End an active call
router.post('/end-call/:callId', callController.endCall);

module.exports = router;
