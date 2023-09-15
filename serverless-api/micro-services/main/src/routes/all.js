const express = require('express');
const { Router } = require("express");
import * as services from '../services';
const controller = require('../controllers/guests');

const router = Router();

router.use((req, res, next) => {
  req.version = services.checkReqVersion(req);
  next();
});

router.use('/auth/:version', require('./auth'));
// router.use('/v1/auth', require('./auth'));

router.use('/api/:version/users', require('./users'));
// router.use('/v1/api/users', require('./users'));

router.use('/api/:version/events', require('./events'));
// router.use('/v1/api/events', require('./events'));

router.use('/api/:version/worlds', require('./worlds'));
// router.use('/v1/api/worlds', require('./worlds'));

router.use('/api/:version/guests', require('./guests'));
// router.use('/v1/api/guests', require('./guests'));

router.use('/api/:version/props', require('./props'));
// router.use('/v1/api/props', require('./props'));

router.use('/api/', require('./root'));
router.use('/', require('./root'));

module.exports = router;
