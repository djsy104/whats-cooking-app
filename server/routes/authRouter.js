import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import { registerValidation } from '../validations/authValidation.js';
import validateRequest from '../middleware/validateRequest.js';
import { register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);

export default router;
