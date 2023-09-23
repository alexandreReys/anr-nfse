const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/me', controller.me);
router.get('/list', controller.listAll);
router.get('/remove-tests/', controller.removeTests);

module.exports = router;