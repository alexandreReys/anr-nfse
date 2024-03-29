import express from 'express';
import { Router } from "express";
import * as services from '../services';

import authRouter from './auth';
import usersRouter from './users';
import organizationsRouter from './organizations';
import servicesRouter from './services';
import customersRouter from './customers';
import serviceOrdersRouter from './service-orders';
import nfseRouter from './nfse';

const router = Router();

router.use((req, res, next) => {
  (req as any).version = services.checkReqVersion(req);
  next();
});

router.use('/auth/:version', authRouter);
router.use('/api/:version/users', usersRouter);
router.use('/api/:version/organizations', organizationsRouter);
router.use('/api/:version/services', servicesRouter);
router.use('/api/:version/customers', customersRouter);
router.use('/api/:version/serviceOrders', serviceOrdersRouter);
router.use('/api/:version/nfse', nfseRouter);
router.use('/api/', require('./root'));
router.use('/', require('./root'));

export default router;
