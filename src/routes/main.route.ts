import { Request, Response, Router } from 'express';
import authGard from '../config/auth.middleware';
import authRouter from './auth.route';
import authorRoute from './author.route';
import bookRoute from './book.route';
import userRoute from './user.route';

const mainRouter = Router();

mainRouter.get('/', (req: Request, res: Response) => {
  res.send('welcome to books api');
});

mainRouter.use('/auth', authRouter);
mainRouter.use('/authors', authorRoute);
mainRouter.use('/books', bookRoute);
mainRouter.use('/user', authGard, userRoute);

export default mainRouter;
