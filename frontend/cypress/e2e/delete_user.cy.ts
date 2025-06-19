describe('Eliminar usuario', () => {
  const testRut = '98765432-1';
  const testUser = { // TODO : esto igual se puede cambiar a una interfaz general o un DTO
    rut: testRut,
    nombre: 'UsuarioPrueba',
    fechaNacimiento: '1990-01-01',
    cantidadHijos: 0,
    correos: ['eliminar@example.com'],
    telefonos: ['111111111'],
    direcciones: ['Calle falsa 456'],
  };

  // Creamos un usuario de prueba con un apicall antes de probar la elimnacion.
  before(() => {
    cy.request('POST', 'http://localhost:3000/api/users', testUser);
  });

  // Con el usuario ya creado y renderizado probamos eliminarlo de la tabla
  it('debería eliminar un usuario que no esté de cumpleaños', () => {
    cy.visit('http://localhost:5173');

    // Busca el <tr> que contiene el RUT exacto
    cy.get('table tbody tr').contains('td', testRut).parent().within(() => {
      cy.contains('Eliminar').click();
    });

    // Confirmamos el diálogo (ventanita de arriba / popup)
    cy.on('window:confirm', () => true);

    // Aseguramos que el usuario desapareció de la tabla
    cy.contains('td', testRut).should('not.exist');
  });
});
