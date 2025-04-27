import { Request, Response, Router } from 'express';
import authRouter from './auth.route';

const mainRouter = Router();

mainRouter.get('/', (req: Request, res: Response) => {
  res.send('welcome to books api');
});

mainRouter.use('/auth', authRouter);

export default mainRouter;
