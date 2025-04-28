import { Request, Response } from 'express';
import { createAuthor, getAuthorById, updateAuthor } from '../models/author.model';
import { AuthorType, AuthorUpdateType } from '../types/author.types';
import errorResponse from '../utils/error-message';
import { createAuthorDTO, updateAuthorDTO } from '../validator/author.validator';

export const createAuthorController = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: AuthorType = req.body;

    const validation = createAuthorDTO.validate(payload);

    if (validation?.error) {
      errorResponse(res, validation.error.details[0].message, 500);
      return;
    }

    const newAuthor: AuthorType = await createAuthor(payload);

    res.status(201).json(newAuthor);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const updateAuthorController = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: AuthorUpdateType = req.body;
    const id: number = +req.params.id;

    const validation = updateAuthorDTO.validate(payload);

    if (validation?.error) {
      errorResponse(res, validation.error.details[0].message, 500);
      return;
    }

    const isExistingAuthor = await getAuthorById(id);

    if (!isExistingAuthor) {
      errorResponse(res, 'Author not found', 400);
      return;
    }

    const newAuthor: AuthorUpdateType = await updateAuthor(id, payload);

    res.status(201).json(newAuthor);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
