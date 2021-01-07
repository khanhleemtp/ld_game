const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/create', roomController.create_room )
router.get('/get', auth, roomController.get_rooms )

module.exports = router; 