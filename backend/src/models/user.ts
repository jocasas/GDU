export interface User {
  rut: string;              // UID
  nombre: string;
  fechaNacimiento: string;
  cantidadHijos: number;
  correos: string[];
  telefonos: string[];
  direcciones: string[];
}

export const users: User[] = [
  {
    rut: '11111111-1',
    nombre: 'Juan Pérez',
    fechaNacimiento: '1990-01-01',
    cantidadHijos: 2,
    correos: ['juan.perez@example.com'],
    telefonos: ['+56912345678'],
    direcciones: ['Av. Siempre Viva 123']
  },
  {
    rut: '22222222-2',
    nombre: 'María López',
    fechaNacimiento: '1985-05-05',
    cantidadHijos: 1,
    correos: ['maria.lopez@example.com'],
    telefonos: ['+56987654321'],
    direcciones: ['Calle Falsa 456']
  },
  {
    rut: '33333333-3',
    nombre: 'Pedro González',
    fechaNacimiento: '1992-08-20',
    cantidadHijos: 0,
    correos: ['pedro.gonzalez@example.com'],
    telefonos: ['+56955555555'],
    direcciones: ['Pasaje El Sauce 789']
  },
  {
    rut: '44444444-4',
    nombre: 'Lucía Ramírez',
    fechaNacimiento: '1995-12-15',
    cantidadHijos: 3,
    correos: ['lucia.ramirez@example.com'],
    telefonos: ['+56944444444'],
    direcciones: ['Av. Las Palmeras 321']
  },
  {
    rut: '55555555-5',
    nombre: 'Carlos Soto',
    fechaNacimiento: '1988-06-30',
    cantidadHijos: 1,
    correos: ['carlos.soto@example.com'],
    telefonos: ['+56966666666'],
    direcciones: ['Calle Los Alerces 654']
  },
  {
    rut: '66666666-6',
    nombre: 'Ana Díaz',
    fechaNacimiento: '1991-09-10',
    cantidadHijos: 0,
    correos: ['ana.diaz@example.com'],
    telefonos: ['+56977777777'],
    direcciones: ['Villa Los Andes 101']
  },
  {
    rut: '77777777-7',
    nombre: 'Ricardo Torres',
    fechaNacimiento: '1983-11-25',
    cantidadHijos: 2,
    correos: ['ricardo.torres@example.com'],
    telefonos: ['+56933333333'],
    direcciones: ['Sector Norte 202']
  },
  {
    rut: '88888888-8',
    nombre: 'Isabel Rojas',
    fechaNacimiento: '1997-03-03',
    cantidadHijos: 0,
    correos: ['isabel.rojas@example.com'],
    telefonos: ['+56922222222'],
    direcciones: ['Av. Central 303']
  },
  {
    rut: '99999999-9',
    nombre: 'Tomás Fuentes',
    fechaNacimiento: '1986-04-18',
    cantidadHijos: 4,
    correos: ['tomas.fuentes@example.com'],
    telefonos: ['+56911111111', '+56999999999'],
    direcciones: ['Condominio Los Robles 404', 'Casa Blanca 505']
  },
  {
    rut: '12345678-9',
    nombre: 'Sofía Castillo',
    fechaNacimiento: '1994-07-22',
    cantidadHijos: 1,
    correos: ['sofia.castillo@example.com'],
    telefonos: ['+56988888888'],
    direcciones: ['Camino Real 606']
  }
]