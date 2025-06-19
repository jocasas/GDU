describe('Agregar usuario con múltiples correos, teléfonos y direcciones', () => {
  const rut = 'multi-9999';

  it('debería agregar usuario con campos múltiples', () => {
    cy.visit('http://localhost:5173/add');

    cy.get('input[type="text"]').eq(0).type(rut); // RUT
    cy.get('input[type="text"]').eq(1).type('Usuario Múltiple'); // Nombre
    cy.get('input[type="date"]').type('1990-05-20');
    cy.get('input[type="number"]').type('3');
    cy.get('input[type="correos"]').type('correo1@example.com');

    // Teléfonos
    cy.contains('+ Agregar teléfono').click();
    cy.get('input[type="text"]').eq(2).type('123456789');
    cy.get('input[type="text"]').eq(3).type('987654321');

    // Direcciones
    cy.contains('+ Agregar dirección').click();
    cy.get('input[type="text"]').eq(4).type('Calle 1');
    cy.get('input[type="text"]').eq(5).type('Calle 2');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('td', rut).should('exist');
  });
});
