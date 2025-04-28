import { Request, Response } from 'express';
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from '../models/author.model';
import { AuthorType, AuthorUpdateType } from '../types/author.types';
import errorResponse from '../utils/error-message';
import { createAuthorDTO, updateAuthorDTO } from '../validator/author.validator';


export const getAuthorListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.query.name as string | undefined;
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;

    const authorList = await getAllAuthors({ name, page, perPage });

    if (!authorList) {
      errorResponse(res, 'Failed to get author list. Please try again later.', 500);
      return;
    }

    res.status(201).json({ success: true, data: authorList });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const getAuthorDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = +req.params.id;

    const authorDetails = await getAuthorById(id);

    if (!authorDetails) {
      errorResponse(res, 'Failed to get author list. Please try again later.', 500);
      return;
    }

    res.status(201).json({ success: true, data: authorDetails });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const createAuthorController = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: AuthorType = req.body;

    const validation = createAuthorDTO.validate(payload);

    if (validation?.error) {
      errorResponse(res, validation.error.details[0].message, 500);
      return;
    }

    const newAuthor: AuthorType = await createAuthor(payload);

    if (!newAuthor) {
      errorResponse(res, 'Failed to create author. Please try again later.', 500);
      return;
    }

    res.status(201).json({ success: true, data: newAuthor });
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

    const updatedData: AuthorUpdateType = await updateAuthor(id, payload);

    if (!updatedData) {
      errorResponse(res, 'Failed to update author. Please try again later.', 500);
      return;
    }

    res.status(201).json({ success: true, data: updatedData });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const authorDeleteController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = +req.params.id;

    const isExistingAuthor = await getAuthorById(id);

    if (!isExistingAuthor) {
      errorResponse(res, 'Author not found', 400);
      return;
    }

    const remove = await deleteAuthor(id);

    if (!remove) {
      errorResponse(res, 'Failed to delete author. Please try again later.', 500);
      return;
    }

    res.status(201).json({ success: true, data: isExistingAuthor });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
