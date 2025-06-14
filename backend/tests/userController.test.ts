import { Request, Response } from 'express';
import { getUsers,createUser } from '../src/controllers/userController';
import { users } from '../src/models/user';

// #01
describe('User Controller', () => {
  it('should return an empty array when no items exist', () => {
    // Create mock objects for Request, Response, and NextFunction
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    // Ensure that our in-memory store is empty
    users.length = 0;

    // Execute our controller function
    getUsers(req, res, jest.fn());

    // Expect that res.json was called with an empty array
    expect(res.json).toHaveBeenCalledWith([]);
  });
});

// #02 Crear y Comprobar que no se puede pisar uno ya existente
describe('createUser', () => {
  it('should add a new user and return it', () => {
    users.length = 0; // Reset store
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

  it('should return 400 if user with same RUT exists', () => {
    const req = {
      body: users[0]  // mismísimo usuario que ya existe
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