import db from '../config/db';
import { BookType, BookUpdateType } from '../types/book.types';

interface getBookListQuery {
  title?: string;
  author?: number;
}

export const getAllBooks = async (queries: getBookListQuery) => {
  const query = db('books')
    .select('id', 'title', 'published_date', 'author_id', 'created_at')
    .orderBy('created_at', 'desc');

  if (queries?.title) {
    query.where('title', 'ilike', `%${queries.title}%`);
  }

  if (queries?.author) {
    query.where('author_id', queries.author);
  }

  return query;
};

export const getBookById = async (id: number) => {
  const book = await db('books')
    .select(
      'books.id',
      'books.title',
      'books.description',
      'books.published_date',
      'books.created_at',
      'authors.id as author_id',
      'authors.name as author_name',
      'authors.bio as author_bio',
      'authors.birthdate as author_birthdate',
    )
    .leftJoin('authors', 'books.author_id', 'authors.id')
    .where('books.id', id)
    .first();

  if (book) {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      published_date: book.published_date,
      created_at: book.created_at,
      information: {
        id: book.author_id,
        name: book.author_name,
        bio: book.author_bio,
        birthdate: book.author_birthdate,
      },
    };
  }
  return null;
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
