import db from '../config/db';
import { AuthorType, AuthorUpdateType } from '../types/author.types';

export const getAllAuthors = async (authorName: string) => {
  const authorQuery = db('authors')
    .select('id', 'name', 'bio', 'birthdate', 'created_at')
    .orderBy('created_at', 'desc');

  if (authorName) {
    authorQuery.where('name', 'ilike', `%${authorName}%`);
  }

  const authors = await authorQuery;

  const authorIds = authors?.map((author: AuthorType) => author.id);

  const books = await db('books')
    .select('id', 'title', 'published_date', 'author_id', 'created_at')
    .whereIn('author_id', authorIds)
    .orderBy('created_at', 'desc');

  const authorResponse = authors?.map((author) => {
    const filteredBooks = books?.filter((book) => book.author_id === author.id);

    const data = {
      ...author,
      books: filteredBooks,
    };

    return data;
  });

  return authorResponse;
};

export const getAuthorById = async (id: number) => {
  const author = await db('authors').where('id', id).first();

  const books = await db('books')
    .select('id', 'title', 'published_date', 'author_id', 'created_at')
    .where('author_id', author.id)
    .orderBy('created_at', 'desc');

  return { ...author, books };
};

export const getAuthorByEmail = async (email: string) => {
  return db('authors').where('email', email).first();
};

export const createAuthor = async (author: Omit<AuthorType, 'id'>) => {
  const [newAuthor] = await db('authors').insert(author).returning('*');
  return newAuthor;
};

export const updateAuthor = async (id: number, author: Partial<AuthorUpdateType>) => {
  const [updatedAuthor] = await db('authors').where('id', id).update(author).returning('*');
  return updatedAuthor;
};

export const deleteAuthor = async (id: number) => {
  const deletedAuthor = await db('authors').where('id', id).del();
  return deletedAuthor;
};
