import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import { register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register');

export default router;
