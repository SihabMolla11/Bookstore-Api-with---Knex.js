import { Request, Response, Router } from 'express';
import authRouter from './auth.route';
import authorRoute from './author.route';

const mainRouter = Router();

mainRouter.get('/', (req: Request, res: Response) => {
  res.send('welcome to books api');
});

mainRouter.use('/auth', authRouter);
mainRouter.use('/authors', authorRoute);

export default mainRouter;
