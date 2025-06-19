describe('Agregar usuario con múltiples correos, teléfonos y direcciones', () => {
  const rut = 'multi-9999';

  it('debería agregar usuario con campos múltiples', () => {
    cy.visit('http://localhost:5173/add');

    // Rellenar campos base
    cy.get('input[name="rut"]').type(rut);
    cy.get('input[name="nombre"]').type('Usuario Múltiple');
    cy.get('input[name="fechaNacimiento"]').type('1990-05-20');
    cy.get('input[name="cantidadHijos"]').clear().type('3');
    cy.get('input[name="correos"]').type('correo1@example.com');

    // Teléfonos
    cy.contains('+ Agregar teléfono').click();
    cy.get('input[name="telefono-0"]').type('123456789');
    cy.get('input[name="telefono-1"]').type('987654321');

    // Direcciones
    cy.contains('+ Agregar dirección').click();
    cy.get('input[name="direccion-0"]').type('Calle 1');
    cy.get('input[name="direccion-1"]').type('Calle 2');

    // Enviar formulario
    cy.get('button[type="submit"]').click();

    // Verifica que aparece en el listado
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get(`[data-testid="rut-${rut}"]`).should('exist');
    cy.get(`[data-testid="telefonos-${rut}"]`).should('contain', '123456789');
    cy.get(`[data-testid="direcciones-${rut}"]`).should('contain', 'Calle 2');
  });
});
