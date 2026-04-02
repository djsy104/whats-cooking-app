import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import {
  registerValidation,
  loginValidation,
} from '../validations/authValidation.js';
import validateRequest from '../middleware/validateRequest.js';
import { register, login, getUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.get('/me', authenticateUser, getUser);

export default router;
