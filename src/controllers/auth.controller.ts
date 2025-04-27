import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import { AuthorType, createAuthor, getAuthorByEmail } from '../models/author.model';
import errorResponse from '../utils/error-message';
import { signToken } from '../utils/jwt.util';
import authorValidationType from '../validator/author.validator';

export const registrationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { body: payload } = req;

    const validation = authorValidationType.validate(payload);

    if (validation?.error) {
      errorResponse(res, validation.error.details[0].message, 500);
      return;
    }

    const isAlreadyExisting = await getAuthorByEmail(payload.email);

    if (isAlreadyExisting) {
      errorResponse(res, 'Email Already Existing', 500);
      return;
    }

    const hashedPassword = await bcryptjs.hash(payload?.password, 10);
    payload.password = hashedPassword;

    const newAuthor: AuthorType = await createAuthor(payload);

    const token: string = signToken(newAuthor.id, newAuthor.email, newAuthor.name);

    const data = {
      name: newAuthor.name,
      email: newAuthor?.email,
      birthdate: newAuthor?.birthdate,
      token,
    };

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
