import { Request, Response } from 'express';
import { getUsers,createUser,getUserByRut,updateUser,deleteUser } from '../../controllers/userController';
import { users } from '../../models/user';

// #01
describe('User Controller', () => {
  it('should return an empty array when no items exist', () => {
    // Create mock objects for Request, Response, and NextFunction
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response; // ??? Agregar unknown a los res porque son mock y ts manda alerta por no ser una implementacion completa y nosotros solo queremos hacer mock de response

    users.length = 0; // Asegurar in-memory store como vacio
    getUsers(req, res, jest.fn());

    // Expect res.json sea un -> empty array
    expect(res.json).toHaveBeenCalledWith([]);
  });
});

// #02 Crear y Comprobar que no se puede pisar uno ya existente
describe('createUser', () => {
  it('should add a new user and return it', () => {
    users.length = 0; // Reset in-memory store
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

// #03 Conseguir un usuario en especifico
describe('getUserByRut', () => {

  // Devuelve un usuario por rut
  it('should return user by RUT', () => {
    const req = {
      params: { rut: users[0].rut }
    } as unknown as Request;

    const res = {
      json: jest.fn()
    } as unknown as Response;

    getUserByRut(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith(users[0]);
  });

  // Debe devolver not found si no existe
  it('should return 404 if user not found', () => {
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

// #04 Actualizar el usuario
describe('updateUser', () => {

  // D
  it('should update existing user', () => {
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

  // Si no existe
  it('should return 404 if user not found', () => {
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

// #05 Borrar un usuario 
describe('deleteUser', () => {

  // No es su cumple
  it('should delete user if not on birthday', () => {
    // Cambiar fechaNacimiento a algo distinto a hoy
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

  // Es su cumple
  it('should return 400 if user is on birthday', () => {
    const today = new Date().toISOString().slice(5, 10);
    users.push({
      rut: '11111111-1',
      nombre: 'Cumpleañero',
      fechaNacimiento: `2000-${today}`, // toDay
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
