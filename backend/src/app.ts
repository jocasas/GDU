import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import base from './routes/base';

// Inicialización de la aplicación Express
// Descripción: Crea la instancia principal de la app Express.
const app = express();

// [Middleware CORS]
// Descripción: Habilita CORS para permitir peticiones cross-origin.
app.use(cors());

// [Middleware para parsear JSON]
// Descripción: Convierte el body de las peticiones JSON en objeto JS accesible.
app.use(express.json());

// [Rutas principales]
// Descripción: 
// - '/api/users' delega a userRoutes (CRUD usuarios)
// - '/' delega a base (ruta base, status del servidor)
app.use('/api/users', userRoutes);
app.use('/', base);

// [Middleware] global para manejo de errores
// Descripción: Captura errores que ocurren en rutas o middlewares anteriores y responde con status y mensaje.
app.use(errorHandler);

// Exportar la app para ser usada en server o tests
export default app;