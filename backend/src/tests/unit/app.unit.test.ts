import { execSync } from 'child_process';
import path from 'path';

// Este bloque se omite en entorno CI
if (process.env.CI) {
  test.skip('debería iniciar el servidor sin errores', () => { /* ... */ });
} else {
  describe('Compilación y ejecución del proyecto', () => {

    // #01 Compilación sin errores
    // Parámetros: ninguno
    // Descripción: Ejecuta el comando `npm run build` y espera que no lance excepciones.
    it('debería compilar sin errores', () => {
      expect(() => {
        execSync('npm run build', { stdio: 'inherit' });
      }).not.toThrow();
    });

    // #02 Inicio del servidor sin errores
    // Parámetros: ninguno
    // Descripción: Intenta ejecutar el servidor compilado (`dist/server.js`) y espera que no falle.
    it('debería iniciar el servidor sin errores', () => {
      const serverPath = path.join(process.cwd(), 'dist', 'server.js');

      expect(() => {
        execSync(`node "${serverPath}"`, { timeout: 30000 });
      }).not.toThrow();
    });
  });
}
