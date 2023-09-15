const express = require('express');
const router = express.Router();
const controller = require('../controllers/events');

router.post('/', controller.create);
router.get('/list/:listAll', controller.listAll);
router.get('/list', controller.listAll);
router.get('/remove-tests/', controller.removeTests);
router.get('/remove-all-tests/', controller.removeAllTests);
router.get('/user-in-event/:eventId', controller.checkIfUserIsInEvent);
router.get('/subscribed/:userId', controller.subscribed);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;