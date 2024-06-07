import express from 'express';
import { login, register, resetPassword } from '@controllers/auth/auth';
import { checkSameUser } from '@middlewares/auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/reset-password', [checkSameUser], resetPassword);

export default router;
