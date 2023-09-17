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
router.use('/api/:version/users', require('./users'));
router.use('/api/', require('./root'));
router.use('/', require('./root'));

module.exports = router;
