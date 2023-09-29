const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/list', controller.listAll);
router.get('/:id', controller.get);
router.delete('/:id', controller.remove);
router.get('/me', controller.me);
router.get('/remove-tests/', controller.removeTests);

module.exports = router;