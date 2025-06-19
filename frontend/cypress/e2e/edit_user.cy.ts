describe('Editar usuario', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('debería editar un usuario existente', () => {
    // Asegúrate de que el usuario ya exista (ocupamos el de uno que exista como el que se crea con el test de agregar que corre antes)
    cy.contains('12345678-9')
      .parent()
      .within(() => {
        cy.contains('Editar').click();
      });

    // Cambiar nombre
    cy.get('input[name="nombre"]').clear().type('Juan Editado');

    // Cambiar correo
    cy.get('input[name="correos"]').clear().type('editado@example.com');

    // Cambiar cantidad de hijos
    cy.get('input[name="cantidadHijos"]').clear().type('3');

    // Guardar cambios
    cy.contains('Guardar cambios').click();

    // Verificar cambios en el listado
    cy.contains('Juan Editado');
    cy.contains('editado@example.com');
    cy.contains('3');
  });
});
