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

* Node.js (versión 18 o superior)
* npm

### Instalación

Desde la raíz del proyecto:

```bash
npm install
```

### Ejecutar todo el aplicativo con los Scripts principales

Desde la raíz del proyecto:

```bash
npm run dev
```

Esto levanta:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend (API): [http://localhost:3000](http://localhost:3000)

> Se pueden ejecutar por separado de querer hacerlo

```bash
npm run dev:frontend
npm run dev:backend
```

#### Correr el proyecto de manera manual

Puedes correrlo entrando a cada carpeta de los componentes y correr lo siguiente :

```bash
npm run dev
```

### Ejecutar Pruebas con los Scripts principales

Ejecutar todas las pruebas (frontend + backend) desde la raíz:

Desde la raíz del proyecto:

```bash
npm test
```

> Se pueden Ejecutar pruebas de manera individual tambien:

Backend

```bash
npm run test:backend
```

Frontend

```bash
npm run test:frontend
```

#### Ejecutar pruebas en caso de querer de manera manual

Backend

```bash
cd /backend && npm run test
```

Frontend

```bash
# Debes correr ambos componentes para hacer las pruebas del frontend pues consume la api por tanto puedes hacer lo siguiente :

# En una primera terminal (terminal 1)
cd /backend && npm run dev

# En una terminal o proceso aparte correr (terminal 2)
cd /frontend && npm run dev

# En una ultima terminal Finalmente para ver la interfaz grafica (terminal 3)
cd /frontend && npx cypress open
```
