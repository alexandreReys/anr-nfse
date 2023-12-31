import express from 'express';
const controller = require('../controllers/auth');

const router = express.Router();

router.post('/login', controller.login);
router.post('/social', controller.social);
router.post('/register', controller.register);

export default router;