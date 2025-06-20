import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import base from './routes/base';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/',base)
// Global error handler (should be after routes)
app.use(errorHandler);

export default app;