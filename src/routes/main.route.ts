import { Request, Response, Router } from 'express';
import authRouter from './auth.route';
import authorRoute from './author.route';
import bookRoute from './book.route';

const mainRouter = Router();

mainRouter.get('/', (req: Request, res: Response) => {
  res.send('welcome to books api');
});

mainRouter.use('/auth', authRouter);
mainRouter.use('/authors', authorRoute);
mainRouter.use('/books', bookRoute);

export default mainRouter;
