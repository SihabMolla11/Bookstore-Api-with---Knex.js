import { Router } from 'express';
import {
  createBookController,
  deleteBookController,
  getBookDetailsController,
  getBookListController,
  updateBookController,
} from '../controllers/book.controller';

const bookRoute = Router();

bookRoute.post('/', createBookController);
bookRoute.get('/', getBookListController);
bookRoute.get('/:id', getBookDetailsController);
bookRoute.put('/:id', updateBookController);
bookRoute.delete('/:id', deleteBookController);

export default bookRoute;
