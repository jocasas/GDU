describe('No permite eliminar usuario que está de cumpleaños', () => {
  const today = new Date().toISOString().split('T')[0];

  const birthdayUser = {
    rut: 'cumple-1234',
    nombre: 'Cumpleañero',
    fechaNacimiento: today,
    cantidadHijos: 0,
    correos: 'cumple@example.com',
    telefonos: ['123456789'],
    direcciones: ['Calle Cumple'],
  };

  before(() => {
    cy.request('GET', 'http://localhost:3000/api/users').then((response) => {
      const users = response.body;
      const exists = users.some((u: any) => u.rut === birthdayUser.rut);
      if (!exists) {
        cy.request('POST', 'http://localhost:3000/api/users', birthdayUser);
      }
    });
  });

  it('debe mostrar alerta y no eliminar', () => {
    cy.visit('http://localhost:5173');

    cy.get(`[data-testid="eliminar-${birthdayUser.rut}"]`).click();

    cy.on('window:alert', (text) => {
      expect(text).to.contain('No se puede eliminar a un usuario que está de cumpleaños');
    });

    cy.get(`[data-testid="fechaNacimiento-${birthdayUser.rut}"]`).should('exist');
  });
});
