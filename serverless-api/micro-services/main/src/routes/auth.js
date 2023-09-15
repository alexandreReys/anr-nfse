const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.post('/login', controller.login);
router.post('/social', controller.social);
router.post('/register', controller.register);

module.exports = router;