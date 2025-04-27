import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mainRouter from './routes/main.route';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const origin = ['http://localhost:3000'];

app.use(
  cors({
    origin,
    credentials: true,
    methods: ['PUT', 'GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);

app.use('/api/v1', mainRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
