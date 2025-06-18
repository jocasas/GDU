describe('Flujo de agregar usuario', () => {
    it('debería agregar un nuevo usuario correctamente', () => {
        cy.visit('http://localhost:5173/');

        // Click en botón "Agregar Usuario"
        cy.contains('Agregar Usuario').click();

        // Rellenar formulario
        cy.get('input[name="rut"]').type('12345678-9');
        cy.get('input[name="nombre"]').type('Juan Pérez');
        cy.get('input[name="fechaNacimiento"]').type('1990-05-10');
        cy.get('input[name="cantidadHijos"]').type('2');
        cy.get('input[name="correos"]').type('juan@example.com');

        // Teléfonos y Direcciones
        cy.contains('+ Agregar teléfono').click();
        cy.get('input[type="text"]').eq(0).type('987654321');

        cy.contains('+ Agregar dirección').click();
        cy.get('input[type="text"]').eq(1).type('Calle Falsa 123');

        // Enviar formulario
        cy.get('button[type="submit"]').click();

        // Verifica que redirigió a la tabla y aparece el nuevo usuario
        cy.url().should('eq', 'http://localhost:5173/');
        cy.contains('Juan Pérez').should('exist');
    });
});
