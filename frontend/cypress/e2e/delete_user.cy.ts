describe('Eliminar usuario', () => {
  const testRut = '98765432-1';
  const testUser = {
    rut: testRut,
    nombre: 'UsuarioPrueba',
    fechaNacimiento: '1990-01-01',
    cantidadHijos: 0,
    correos: 'eliminar@example.com',
    telefonos: ['111111111'],
    direcciones: ['Calle falsa 456'],
  };

  // Crear usuario antes de correr la prueba
  before(() => {
    cy.request('POST', 'http://localhost:3000/api/users', testUser);
  });

  it('debería eliminar un usuario que no esté de cumpleaños', () => {
    cy.visit('http://localhost:5173');

    // Click en el botón eliminar específico
    cy.get(`[data-testid="eliminar-${testRut}"]`).click();

    // Confirmamos el alert
    cy.on('window:confirm', () => true);

    // Aseguramos que ya no está en el DOM
    cy.get(`[data-testid="fila-${testRut}"]`).should('not.exist');
  });
});
