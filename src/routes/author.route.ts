import { Router } from 'express';
import {
  authorDeleteController,
  createAuthorController,
  getAuthorDetailsController,
  getAuthorListController,
  updateAuthorController,
} from '../controllers/author.controller';

const authorRoute = Router();

authorRoute.post('/', createAuthorController);
authorRoute.get('/', getAuthorListController);
authorRoute.get('/:id', getAuthorDetailsController);
authorRoute.put('/:id', updateAuthorController);
authorRoute.delete('/:id', authorDeleteController);

export default authorRoute;
