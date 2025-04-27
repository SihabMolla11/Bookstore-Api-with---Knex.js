import db from '../config/db';

export interface AuthorType {
  id: number;
  email: string;
  password: string;
  name: string;
  bio?: string;
  birthdate: string;
}

export interface AuthorUpdateType {
  email?: string;
  password?: string;
  name?: string;
  bio?: string;
  birthdate?: string;
}

export const getAllAuthors = async () => {
  return db('authors').select('*');
};

export const getAuthorById = async (id: number) => {
  return db('authors').where('id', id).first();
};

export const createAuthor = async (author: Omit<AuthorType, 'id'>) => {
  return db('authors').insert(author).returning('*');
};

export const updateAuthor = async (id: number, author: Partial<AuthorUpdateType>) => {
  return db('authors').where('id', id).update(author).returning('*');
};

export const deleteAuthor = async (id: number) => {
  return db('authors').where('id', id).del();
};
