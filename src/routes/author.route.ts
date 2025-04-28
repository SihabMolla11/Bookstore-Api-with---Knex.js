import { Router } from 'express';
import { createAuthorController, updateAuthorController } from '../controllers/author.controller';

const authorRoute = Router();

authorRoute.post('/create', createAuthorController);
authorRoute.put('/update/:id', updateAuthorController);

export default authorRoute;
