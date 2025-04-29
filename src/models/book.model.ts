import db from '../config/db';
import { BookType, BookUpdateType } from '../types/book.types';

interface getBookListQuery {
  title?: string;
  author?: number;
  page: number;
  perPage: number;
}

export const getAllBooks = async (queries: getBookListQuery) => {
  const page = queries.page;
  const perPage = queries.perPage;
  const skip = (page - 1) * perPage;

  const query = db('books').where((qb) => {
    if (queries?.title) {
      qb.where('title', 'ilike', `%${queries.title}%`);
    }
    if (queries?.author) {
      qb.where('author_id', queries.author);
    }
  });

  const totalResult = await query.clone().count<{ count: string }>('id as count').first();
  const total = Number(totalResult?.count) || 0;

  const books = await query
    .clone()
    .select('id', 'title', 'published_date', 'author_id', 'created_at')
    .orderBy('created_at', 'desc')
    .limit(perPage)
    .offset(skip);

  return { books, page, perPage, total };
};

export const getBookDetailsById = async (id: number) => {
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

  if (!book) {
    return null;
  }

  return {
    id: book.id,
    title: book.title,
    description: book.description,
    published_date: book.published_date,
    created_at: book.created_at,
    author_information: {
      id: book.author_id,
      name: book.author_name,
      bio: book.author_bio,
      birthdate: book.author_birthdate,
    },
  };
};

export const getBookById = async (id: number) => {
  const book = await db('books').where('books.id', id).first().select('id', 'title');

  return book;
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
