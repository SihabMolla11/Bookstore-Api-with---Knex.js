import db from '../config/db';
import { AuthorType, AuthorUpdateType } from '../types/author.types';

export const getAllAuthors = async (authorName: string) => {
  const query = db('authors').select('id', 'name', 'bio', 'birthdate', 'created_at');

  if (authorName) {
    query.where('name', 'ilike', `%${authorName}%`);
  }

  return query;
};

export const getAuthorById = async (id: number) => {
  return db('authors').where('id', id).first();
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
