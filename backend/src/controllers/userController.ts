import { Request, Response, NextFunction } from 'express';
import { users, User } from '../models/user';


// #01 Obtener todos los usuarios
// Parámetros: ninguno
// Descripción: Devuelve un array con todos los usuarios almacenados en memoria.
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(users);
  } catch (error) {
    next(error);
  }
};


// #02 Crear nuevo usuario
// Parámetros: objeto User en req.body
// Descripción: Agrega un usuario nuevo si el RUT no está registrado. Si el RUT existe, responde con error 400.
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser: User = req.body;

    // Validar que el RUT sea único
    const exists = users.some(u => u.rut === newUser.rut);
    if (exists) {
      res.status(400).json({ message: 'El RUT ya está registrado' });
      return;
    }

    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};


// #03 Obtener usuario por RUT
// Parámetros: rut en req.params.rut
// Descripción: Busca y devuelve un usuario específico según el RUT. Si no existe, responde con error 404.
export const getUserByRut = (req: Request, res: Response, next: NextFunction) => {
  try {
    const rut = req.params.rut;
    const user = users.find(u => u.rut === rut);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};


// #04 Actualizar usuario (sin modificar RUT)
// Parámetros: rut en req.params.rut, datos actualizados en req.body
// Descripción: Actualiza los campos del usuario identificado por RUT. Si no existe, error 404.
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const rut = req.params.rut;
    const userIndex = users.findIndex(u => u.rut === rut);

    if (userIndex === -1) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const { nombre, fechaNacimiento, cantidadHijos, correos, telefonos, direcciones } = req.body;

    users[userIndex] = {
      ...users[userIndex], // mantiene el RUT original
      nombre,
      fechaNacimiento,
      cantidadHijos,
      correos,
      telefonos,
      direcciones,
    };

    res.json(users[userIndex]);
  } catch (error) {
    next(error);
  }
};


// #05 Eliminar usuario (excepto si está de cumpleaños hoy)
// Parámetros: rut en req.params.rut
// Descripción: Elimina el usuario identificado por RUT salvo que su fecha de nacimiento coincida con el día actual (mes y día). Si no existe, error 404.
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const rut = req.params.rut;
    const userIndex = users.findIndex(u => u.rut === rut);

    if (userIndex === -1) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const today = new Date().toISOString().slice(5, 10); // MM-DD
    const userBirthDate = users[userIndex].fechaNacimiento.slice(5, 10);

    if (userBirthDate === today) {
      res.status(400).json({ message: 'No se puede eliminar un usuario en su cumpleaños' });
      return;
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};
