const express = require('express');
const router = express.Router();
const controller = require('../controllers/service-orders');

router.post('/', controller.create);
router.put('/:organizationId/:id', controller.update);
router.get('/list/:organizationId', controller.listByCustomer);
router.get('/:organizationId/:id', controller.get);
router.delete('/:organizationId/:id', controller.remove);
router.get('/remove-tests/', controller.removeTests);

module.exports = router;