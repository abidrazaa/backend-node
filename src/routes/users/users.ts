import express from 'express';
import { updateUser, userById, deleteUser } from '@controllers/auth/auth';
import { getAllUsers } from '@controllers/admin/dashboard';
import { isAdmin, checkSameUserOrAdmin } from '@middlewares/auth';

const router = express.Router();

// USER
router.get('/:id', userById);
router.patch('/:id', [checkSameUserOrAdmin], updateUser);

router.get('/', [isAdmin], getAllUsers);
router.delete('/:id', [isAdmin], deleteUser);

export default router;
