import { Request, Response } from 'express';
import { getAuthorById } from '../models/author.model';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../models/book.model';
import { BookType, BookUpdateType } from '../types/book.types';
import errorResponse from '../utils/error-message';
import { createBookDTO, updateBookDTO } from '../validator/book.validator';

export const getBookListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const title = req.query.title as string | undefined;
    const author = req.query.author as number | undefined;
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;

    const books = await getAllBooks({ title, author, page, perPage });

    if (!books) {
      errorResponse(res, 'Failed to get book list. Please try again later.', 500);
      return;
    }

    res.status(200).json({ success: true, data: books });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const getBookDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = +req.params.id;

    const bookDetails = await getBookById(id);

    if (!bookDetails) {
      errorResponse(res, 'Failed to get book details. Please try again later.', 500);
      return;
    }

    res.status(200).json({ success: true, data: bookDetails });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const createBookController = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: BookType = req.body;

    const validation = createBookDTO.validate(payload);

    if (validation?.error) {
      errorResponse(res, validation.error.details[0].message, 400);
      return;
    }

    const isExistingAuthor = await getAuthorById(payload.author_id);

    if (!isExistingAuthor) {
      errorResponse(res, 'Author not found', 400);
      return;
    }

    const newBook = await createBook(payload);

    if (!newBook) {
      errorResponse(res, 'Failed to create book. Please try again later.', 500);
      return;
    }

    res.status(201).json({ success: true, data: newBook });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const updateBookController = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: BookUpdateType = req.body;
    const id: number = +req.params.id;

    const validation = updateBookDTO.validate(payload);

    if (validation?.error) {
      errorResponse(res, validation.error.details[0].message, 400);
      return;
    }

    if (payload.author_id) {
      const isExistingAuthor = await getAuthorById(payload.author_id);

      if (!isExistingAuthor) {
        errorResponse(res, 'Author not found', 400);
        return;
      }
    }

    const isExistingBook = await getBookById(id);

    if (!isExistingBook) {
      errorResponse(res, 'Book not found', 400);
      return;
    }

    const updatedBook = await updateBook(id, payload);

    if (!updatedBook) {
      errorResponse(res, 'Failed to update book. Please try again later.', 500);
      return;
    }

    res.status(201).json({ success: true, data: updatedBook });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const deleteBookController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = +req.params.id;

    const isExistingBook = await getBookById(id);

    if (!isExistingBook) {
      errorResponse(res, 'Book not found', 400);
      return;
    }

    const deletedBook = await deleteBook(id);

    if (!deletedBook) {
      errorResponse(res, 'Failed to delete book. Please try again later.', 500);
      return;
    }

    res.status(200).json({ success: true, data: isExistingBook });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
