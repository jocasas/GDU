import request from 'supertest';
import app from '../../app';
import { users } from '../../models/user';

describe('Pruebas de integración: API de usuarios', () => {
  beforeEach(() => {
    users.length = 0; // Reiniciar base de datos en memoria
  });

  // #01 Crear nuevo usuario
  // Parámetros: datos completos de un usuario
  // Descripción: Debe registrar un usuario correctamente y devolver status 201
  it('should create a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        rut: '12345678-9',
        nombre: 'Juan',
        fechaNacimiento: '1990-06-14',
        cantidadHijos: 2,
        correos: ['juan@example.com'],
        telefonos: ['123456789'],
        direcciones: ['Calle Falsa 123'],
      });

    expect(res.status).toBe(201);
    expect(res.body.rut).toBe('12345678-9');
  });

  // #02 No permitir RUT duplicado
  // Parámetros: RUT ya registrado
  // Descripción: Debe rechazar la creación de un usuario con el mismo RUT
  it('should fail to create user with duplicate RUT', async () => {
    await request(app).post('/api/users').send({
      rut: '12345678-9',
      nombre: 'Juan',
      fechaNacimiento: '1990-06-14',
      cantidadHijos: 2,
      correos: ['juan@example.com'],
      telefonos: ['123456789'],
      direcciones: ['Calle Falsa 123'],
    });

    const res = await request(app).post('/api/users').send({
      rut: '12345678-9',
      nombre: 'Otro',
      fechaNacimiento: '2000-01-01',
      cantidadHijos: 1,
      correos: ['otro@example.com'],
      telefonos: ['987654321'],
      direcciones: ['Otra calle'],
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'El RUT ya está registrado' });
  });

  // #03 Obtener usuario por RUT
  // Parámetros: rut existente
  // Descripción: Debe devolver el usuario correspondiente
  it('should get a user by RUT', async () => {
    const user = {
      rut: '11111111-1',
      nombre: 'Maria',
      fechaNacimiento: '1995-05-05',
      cantidadHijos: 1,
      correos: ['maria@example.com'],
      telefonos: ['5555555'],
      direcciones: ['Av Siempreviva 742']
    };
    await request(app).post('/api/users').send(user);

    const res = await request(app).get(`/api/users/${user.rut}`);
    expect(res.status).toBe(200);
    expect(res.body.rut).toBe(user.rut);
  });

  // #04 Buscar RUT inexistente
  // Parámetros: rut inválido
  // Descripción: Debe devolver error 404 si no se encuentra el usuario
  it('should return 404 for non-existent RUT', async () => {
    const res = await request(app).get('/api/users/00000000-0');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Usuario no encontrado' });
  });

  // #05 Actualizar usuario existente
  // Parámetros: rut válido, nuevos datos
  // Descripción: Debe modificar correctamente los datos del usuario
  it('should update an existing user', async () => {
    const rut = '99999999-9';
    await request(app).post('/api/users').send({
      rut,
      nombre: 'Pedro',
      fechaNacimiento: '1992-02-02',
      cantidadHijos: 0,
      correos: ['pedro@example.com'],
      telefonos: ['1111111'],
      direcciones: ['Calle 123'],
    });

    const res = await request(app).put(`/api/users/${rut}`).send({
      nombre: 'Pedro Actualizado',
      fechaNacimiento: '1992-02-02',
      cantidadHijos: 1,
      correos: ['nuevo@example.com'],
      telefonos: ['2222222'],
      direcciones: ['Nueva dirección'],
    });

    expect(res.status).toBe(200);
    expect(res.body.nombre).toBe('Pedro Actualizado');
  });

  // #06 Eliminar usuario que no está de cumpleaños
  // Parámetros: rut válido con fecha de nacimiento distinta a hoy
  // Descripción: Debe permitir la eliminación del usuario
  it('should delete a user if not birthday', async () => {
    const rut = '22222222-2';
    await request(app).post('/api/users').send({
      rut,
      nombre: 'Ana',
      fechaNacimiento: '1999-01-01', // asegurar que no sea hoy
      cantidadHijos: 0,
      correos: [],
      telefonos: [],
      direcciones: []
    });

    const res = await request(app).delete(`/api/users/${rut}`);
    expect(res.body).toBeDefined();
    expect(res.body.rut).toBe(rut);
  });

  // #07 Rechazar eliminación si está de cumpleaños
  // Parámetros: rut válido con fecha igual a hoy
  // Descripción: No debe permitir eliminar usuarios que estén de cumpleaños
  it('should not delete user on birthday', async () => {
    const today = new Date().toISOString().slice(5, 10); // MM-DD
    const rut = '33333333-3';
    await request(app).post('/api/users').send({
      rut,
      nombre: 'Cumpleañero',
      fechaNacimiento: `2000-${today}`, // cumple hoy
      cantidadHijos: 0,
      correos: [],
      telefonos: [],
      direcciones: []
    });

    const res = await request(app).delete(`/api/users/${rut}`);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('No se puede eliminar un usuario en su cumpleaños');
  });

  // #08 Obtener todos los usuarios
  // Parámetros: ninguno
  // Descripción: Debe devolver un array de usuarios registrados
  it('should get all users', async () => {
    users.length = 0;
    users.push({
      rut: '12345678-9',
      nombre: 'Juan',
      fechaNacimiento: '1990-06-14',
      cantidadHijos: 1,
      correos: ['juan@example.com'],
      telefonos: ['123456789'],
      direcciones: ['Calle Falsa 123'],
    });

    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  // #09 Ruta base del servidor
  // Parámetros: ninguno
  // Descripción: Debe devolver mensaje de estado "Servidor funcionando"
  it('should return base route message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Servidor funcionando');
  });
});
