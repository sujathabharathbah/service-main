const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room');

/**
 * Room management routes
 */

// Create a new room
router.post('/createRoom', roomController.createRoom);

module.exports = router;
