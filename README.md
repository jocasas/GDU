# Gestión de Usuarios

Este proyecto es una aplicación de gestión de usuarios construida con un monorepo que contiene:

* Frontend: React + Vite + TypeScript
* Backend: Node.js + Express + TypeScript (sin base de datos persistente)
* Testing: Cypress (e2e visual), JEST (unitarias,integracion), Supertest (integración API)
* CI: GitHub Actions (tests en paralelo para frontend y backend)

---

## Decisiones técnicas

Monorepo con workspaces para compartir dependencias y ejecutar desde la raíz.

* Frontend con Vite para una experiencia de desarrollo más rápida y moderna.
* Cypress para pruebas visuales end-to-end de flujos de usuario en el frontend.
* Jest para unitarias por su rapidez e integración en el backend.
* GitHub Actions para CI paralela en el SDLC.

## Levantar el entorno local

### Requisitos previos

* Node.js (versión 20 o superior)
* npm 9 o superior

### Instalación

Desde la raíz del proyecto:

```bash
npm install
```

### Ejecutar todo el aplicativo con los Scripts principales

Desde la raíz del proyecto:

| Comando                            | Descripción                                            |
| ---------------------------------- | ------------------------------------------------------ |
| `npm run dev`                      | Corre backend y frontend en modo desarrollo simultáneo |
| `npm run test:backend`             | Ejecuta todos los tests del backend                    |
| `npm run test:frontend`            | Levanta las instancias y Corre los tests frontend E2E (Cypress) Headless        |
| `npm run test:frontend:gui`            | Levanta las instancias y  Corre los tests frontend E2E (Cypress) con GUI        |
| `npm run test:backend:integration` | Ejecuta solo tests de integración del backend          |
| `npm run test:backend:unit`        | Ejecuta solo tests unitarios del backend               |
| `npm run dev:backend`              | Corre solo backend en modo desarrollo                  |
| `npm run dev:frontend`             | Corre solo frontend en modo desarrollo                 |
| `npm run build:frontend`           | Construye la aplicación frontend para producción       |

