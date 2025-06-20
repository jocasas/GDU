import { execSync } from 'child_process';
import path from 'path';


if (process.env.CI) {
  test.skip('debería iniciar el servidor sin errores', () => { /* ... */ });
} else {
  describe('Compilación y ejecución del proyecto', () => {
    it('debería compilar sin errores', () => {
      expect(() => {
        execSync('npm run build', { stdio: 'inherit' });
      }).not.toThrow();
    });

    it('debería iniciar el servidor sin errores', () => {
      const serverPath = path.join(process.cwd(), 'dist', 'server.js');

      expect(() => {
        execSync(`node "${serverPath}"`, { timeout: 10000 });
      }).not.toThrow();
    });
  });
}