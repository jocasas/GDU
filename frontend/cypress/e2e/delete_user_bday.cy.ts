describe('No permite eliminar usuario que está de cumpleaños', () => {
  const today = new Date().toISOString().split('T')[0];

  const birthdayUser = {
    rut: 'cumple-1234',
    nombre: 'Cumpleañero',
    fechaNacimiento: today,
    cantidadHijos: 0,
    correos: ['cumple@example.com'],
    telefonos: ['123456789'],
    direcciones: ['Calle Cumple'],
  };

  before(() => {
    cy.request('POST', 'http://localhost:3000/api/users', birthdayUser);
  });

  it('debe mostrar alerta y no eliminar', () => {
    cy.visit('http://localhost:5173');

    cy.contains('td', birthdayUser.rut).parent().within(() => {
      cy.contains('Eliminar').click();
    });

    cy.on('window:alert', (text) => {
      expect(text).to.contain('No se puede eliminar a un usuario que está de cumpleaños');
    });

    cy.contains('td', birthdayUser.rut).should('exist');
  });
});
