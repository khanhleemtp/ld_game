const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup_post)
router.post('/signin', authController.signin_post)
router.get('/user', auth, authController.get_user)

module.exports = router; 