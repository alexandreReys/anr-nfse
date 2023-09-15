const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.get('/me', controller.me);
router.get('/list', controller.listAll);
router.get('/remove-tests/', controller.removeTests);
router.get('/:id', controller.get);
router.delete('/:id', controller.remove);
router.put('/:id', controller.update);

module.exports = router;