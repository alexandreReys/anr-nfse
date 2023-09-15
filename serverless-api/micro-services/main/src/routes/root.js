const express = require('express');
const router = express.Router();
const controller = require('../controllers/root');

router.get('/', controller.root);

module.exports = router;