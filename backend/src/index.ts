import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});