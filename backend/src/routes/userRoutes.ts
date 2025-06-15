import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserByRut,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:rut', getUserByRut);
router.put('/:rut', updateUser);
router.delete('/:rut', deleteUser);

export default router;
