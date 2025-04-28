import db from '../config/db';
import { BookType, BookUpdateType } from '../types/book.types';

export const getAllBooks = async (title: string) => {
  const query = db('books').select(
    'id',
    'title',
    'published_date',
    'author_id',
    'created_at',
  );

  if (title) {
    query.where('title', 'ilike', `%${title}%`);
  }

  return query;
};

export const getBookById = async (id: number) => {
  return db('books').where('id', id).first();
};

export const createBook = async (book: Omit<BookType, 'id' | 'created_at' | 'updated_at'>) => {
  const [newBook] = await db('books').insert(book).returning('*');
  return newBook;
};

export const updateBook = async (id: number, book: Partial<BookUpdateType>) => {
  const [updatedBook] = await db('books').where('id', id).update(book).returning('*');
  return updatedBook;
};

export const deleteBook = async (id: number) => {
  const deletedBook = await db('books').where('id', id).del();
  return deletedBook;
};
