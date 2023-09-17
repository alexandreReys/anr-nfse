import express from 'express';
import { Router } from "express";
import * as services from '../services';
import authRouter from './auth';

const router = Router();

router.use((req, res, next) => {
  (req as any).version = services.checkReqVersion(req);
  next();
});

router.use('/auth/:version', authRouter);
router.use('/api/:version/users', require('./users'));
router.use('/api/', require('./root'));
router.use('/', require('./root'));

export default router;
