const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.post('/', controller.create);
router.put('/:organizationId/:id', controller.update);
router.get('/list/:organizationId', controller.listByOrganization);
router.get('/:organizationId/:id', controller.get);
router.delete('/:organizationId/:id', controller.remove);

module.exports = router;