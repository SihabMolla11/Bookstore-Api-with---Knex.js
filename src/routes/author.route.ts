import { Router } from 'express';
import {
  authorDeleteController,
  createAuthorController,
  getAuthorListController,
  updateAuthorController,
} from '../controllers/author.controller';

const authorRoute = Router();

authorRoute.post('/create', createAuthorController);
authorRoute.put('/update/:id', updateAuthorController);
authorRoute.get('/list', getAuthorListController);
authorRoute.delete('/delete/:id', authorDeleteController);

export default authorRoute;
