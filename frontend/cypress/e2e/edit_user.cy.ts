describe('Editar usuario', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('debería editar un usuario existente', () => {
    const rut = '12345678-9';

    // Ir a la edición del usuario específico
    cy.get(`[data-testid="editar-${rut}"]`).click();

    // Cambiar nombre
    cy.get('input[name="nombre"]').clear().type('Juan Editado');

    // Cambiar correo
    cy.get('input[name="correos"]').clear().type('editado@example.com');

    // Cambiar cantidad de hijos (type="text" ahora)
    cy.get('input[name="cantidadHijos"]')
      .clear()
      .type('3');

    // Guardar cambios
    cy.contains('Guardar cambios').click();

    // Verificar que los cambios se reflejen correctamente en la tabla
    cy.get(`[data-testid="nombre-${rut}"]`).should('contain.text', 'Juan Editado');
    cy.get(`[data-testid="correos-${rut}"]`).should('contain.text', 'editado@example.com');
    cy.get(`[data-testid="cantidadHijos-${rut}"]`).should('contain.text', '3');
  });
});
