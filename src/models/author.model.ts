import db from '../config/db';
import { AuthorType, AuthorUpdateType } from '../types/author.types';

interface getAuthorsListQuery {
  name?: string;
  author?: number;
  page: number;
  perPage: number;
}

export const getAllAuthors = async (queries: getAuthorsListQuery) => {
  const page = queries.page;
  const perPage = queries.perPage;
  const skip = (page - 1) * perPage;

  const authorQuery = db('authors').where((qb) => {
    if (queries?.name) {
      qb.where('name', 'ilike', `%${queries.name}%`);
    }
  });

  const totalResult = await authorQuery.clone().count<{ count: string }>('id as count').first();
  const total = Number(totalResult?.count) || 0;

  const authors = await authorQuery
    .clone()
    .select('id', 'name', 'bio', 'birthdate', 'created_at')
    .orderBy('created_at', 'desc')
    .limit(perPage)
    .offset(skip);

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

  return { authors: authorResponse, total, page, perPage };
};

export const getAuthorDetails = async (id: number) => {
  const author = await db('authors')
    .where('id', id)
    .first()
    .select('id', 'name', 'email', 'bio', 'birthdate', 'created_at');

  if (!author) {
    return null;
  }

  const books = await db('books')
    .select('id', 'title', 'published_date', 'author_id', 'created_at')
    .where('author_id', author.id)
    .orderBy('created_at', 'desc');

  return { ...author, books };
};

export const getAuthorById = async (id: number) => {
  const author = await db('authors').where('id', id).first().select('id', 'name');

  return author;
};

export const getAuthorByEmail = async (email: string) => {
  return db('authors').where('email', email).first();
};

export const createAuthor = async (author: Omit<AuthorType, 'id'>) => {
  const [newAuthor] = await db('authors').insert(author).returning('*');
  return newAuthor;
};

export const updateAuthor = async (id: number, author: Partial<AuthorUpdateType>) => {
  const [updatedAuthor] = await db('authors')
    .where('id', id)
    .update(author)
    .returning(['id', 'name', 'birthdate', 'bio', 'email']);
  return updatedAuthor;
};

export const deleteAuthor = async (id: number) => {
  const deletedAuthor = await db('authors').where('id', id).del();
  return deletedAuthor;
};

export const getUserProfile = async (id: number) => {
  const user = await db('authors')
    .where('id', id)
    .first()
    .select('id', 'name', 'email', 'bio', 'birthdate', 'created_at');

  const books = await db('books')
    .select('id', 'title', 'published_date', 'author_id', 'created_at')
    .where('author_id', user.id)
    .orderBy('created_at', 'desc');

  return { ...user, books };
};
