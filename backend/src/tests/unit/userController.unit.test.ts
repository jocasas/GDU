import { Request, Response } from 'express';
import {
  getUsers,
  createUser,
  getUserByRut,
  updateUser,
  deleteUser
} from '../../controllers/userController';
import { users } from '../../models/user';

// #01 Obtener todos los usuarios
// Parámetros: ninguno
// Descripción: Debe devolver un arreglo vacío si no hay usuarios registrados
describe('User Controller - getUsers', () => {
  it('debería devolver un arreglo vacío cuando no hay usuarios', () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    users.length = 0;
    getUsers(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith([]);
  });
});

// #02 Crear usuario
// Parámetros: body con datos del nuevo usuario
// Descripción: Debe agregar un nuevo usuario si el RUT no está registrado
describe('createUser', () => {
  it('debería agregar un nuevo usuario y devolverlo', () => {
    users.length = 0;
    const req = {
      body: {
        rut: '12345678-9',
        nombre: 'Juan',
        fechaNacimiento: '1990-06-14',
        cantidadHijos: 2,
        correos: ['juan@example.com'],
        telefonos: ['123456789'],
        direcciones: ['Calle Falsa 123'],
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    createUser(req, res, jest.fn());

    expect(users.length).toBe(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(users[0]);
  });

  // #03 Rechazo de RUT duplicado
  // Parámetros: body con RUT ya existente
  // Descripción: No debe permitir la creación de usuarios con RUT repetido
  it('debería devolver 400 si el RUT ya existe', () => {
    const req = {
      body: users[0]
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    createUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'El RUT ya está registrado' });
  });
});

// #04 Obtener usuario por RUT
describe('getUserByRut', () => {
  // Parámetros: params.rut
  // Descripción: Debe devolver el usuario correspondiente al RUT
  it('debería devolver un usuario por RUT', () => {
    const req = {
      params: { rut: users[0].rut }
    } as unknown as Request;

    const res = {
      json: jest.fn()
    } as unknown as Response;

    getUserByRut(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith(users[0]);
  });

  // #05 RUT no encontrado
  // Parámetros: params.rut inexistente
  // Descripción: Debe devolver 404 si el usuario no existe
  it('debería devolver 404 si el usuario no existe', () => {
    const req = {
      params: { rut: '99999999-9' }
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    getUserByRut(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
  });
});

// #06 Actualizar usuario
describe('updateUser', () => {
  // Parámetros: params.rut + body con nuevos datos
  // Descripción: Debe actualizar los datos del usuario existente
  it('debería actualizar un usuario existente', () => {
    const req = {
      params: { rut: users[0].rut },
      body: {
        nombre: 'Juan Actualizado',
        fechaNacimiento: '1990-06-14',
        cantidadHijos: 3,
        correos: ['nuevo@correo.com'],
        telefonos: ['987654321'],
        direcciones: ['Otra calle 456'],
      }
    } as unknown as Request;

    const res = {
      json: jest.fn()
    } as unknown as Response;

    updateUser(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith(users[0]);
    expect(users[0].nombre).toBe('Juan Actualizado');
  });

  // #07 Actualizar usuario no existente
  // Parámetros: params.rut no registrado
  // Descripción: Debe devolver 404 si el usuario no existe
  it('debería devolver 404 si el usuario no existe', () => {
    const req = {
      params: { rut: '00000000-0' },
      body: {}
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    updateUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
  });
});

// #08 Eliminar usuario
describe('deleteUser', () => {

  // Parámetros: params.rut de usuario NO en cumpleaños
  // Descripción: Debe eliminar el usuario si no está de cumpleaños
  it('debería eliminar al usuario si no es su cumpleaños', () => {
    users[0].fechaNacimiento = '1990-01-01';

    const req = {
      params: { rut: users[0].rut }
    } as unknown as Request;

    const res = {
      json: jest.fn()
    } as unknown as Response;

    deleteUser(req, res, jest.fn());

    expect(res.json).toHaveBeenCalled();
    expect(users.find(u => u.rut === req.params.rut)).toBeUndefined();
  });

  // #09 Intento de eliminar en cumpleaños
  // Parámetros: params.rut con fechaNacimiento == hoy
  // Descripción: No debe permitir eliminar usuarios en su cumpleaños
  it('debería devolver 400 si el usuario está de cumpleaños', () => {
    const today = new Date().toISOString().slice(5, 10);
    users.push({
      rut: '11111111-1',
      nombre: 'Cumpleañero',
      fechaNacimiento: `2000-${today}`,
      cantidadHijos: 0,
      correos: [],
      telefonos: [],
      direcciones: []
    });

    const req = {
      params: { rut: '11111111-1' }
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    deleteUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'No se puede eliminar un usuario en su cumpleaños' });
  });
});
