import { Router } from 'express';
import { users } from '../models/userStore';
import { User } from '../models/user';

const router = Router();

// Listar usuarios y total
router.get('/', (_req, res) => {
  res.json({
    total: users.length,
    users,
  });
});

// Crear usuario
router.post('/', (req, res) => {
  const newUser: User = req.body;

  // Validar rut único
  const exists = users.find(u => u.rut === newUser.rut);
  if (exists) {
    return res.status(400).json({ error: 'RUT ya existe' });
  }

  users.push(newUser);
  res.status(201).json(newUser);
});

// Editar usuario (excepto rut)
router.put('/:rut', (req, res) => {
  const rut = req.params.rut;
  const updatedData = req.body as Partial<Omit<User, 'rut'>>;

  const userIndex = users.findIndex(u => u.rut === rut);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Actualizamos campos excepto rut
  users[userIndex] = { ...users[userIndex], ...updatedData };
  res.json(users[userIndex]);
});

// Eliminar usuario (excepto si está de cumpleaños hoy)
router.delete('/:rut', (req, res) => {
  const rut = req.params.rut;
  const today = new Date().toISOString().slice(5, 10); // MM-DD

  const userIndex = users.findIndex(u => u.rut === rut);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Comprobar cumpleaños
  const userBirthday = users[userIndex].fechaNacimiento.slice(5, 10);
  if (userBirthday === today) {
    return res.status(400).json({ error: 'No se puede eliminar usuario en su cumpleaños' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

export default router;
