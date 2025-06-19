describe('Flujo de agregar usuario', () => {
  it('debería agregar un nuevo usuario correctamente', () => {
    cy.visit('http://localhost:5173/');

    cy.contains('Agregar Usuario').click();

    // Rellenar campos
    cy.get('input[name="rut"]').type('313131313-9');
    cy.get('input[name="nombre"]').type('Juan Pérez');
    cy.get('input[name="fechaNacimiento"]').type('1990-05-10');

    cy.get('input[name="cantidadHijos"]')
      .focus()
      .type('{selectall}{backspace}')
      .type('2');

    cy.get('input[name="correos"]').type('juan@example.com');

    cy.contains('+ Agregar teléfono').click();
    cy.get('input[name="telefono-0"]').type('987654321');

    cy.contains('+ Agregar dirección').click();
    cy.get('input[name="direccion-0"]').type('Calle Falsa 123');

    cy.get('button[type="submit"]').click();

    // Verifica que redirigió correctamente y apareció el usuario
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('[data-testid="nombre-313131313-9"]').should('contain', 'Juan Pérez');
  });
});
