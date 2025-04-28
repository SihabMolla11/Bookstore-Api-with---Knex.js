import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import {
  AuthorType,
  createAuthor,
  getAuthorByEmail,
  LoginPayloadType,
} from '../models/author.model';
import errorResponse from '../utils/error-message';
import { signToken } from '../utils/jwt.util';
import { createUserDTO, loginUserDTO } from '../validator/author.validator';

export const registrationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: AuthorType = req.body;

    const validation = createUserDTO.validate(payload);

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
      email: newAuthor.email,
      birthdate: newAuthor.birthdate,
      token,
    };

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const loginAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: LoginPayloadType = req.body;

    const validation = loginUserDTO.validate(payload);

    if (validation?.error) {
      errorResponse(res, validation.error.details[0].message, 500);
      return;
    }

    const existingAuthor: AuthorType = await getAuthorByEmail(payload.email);

    if (!existingAuthor) {
      errorResponse(res, 'No user is registered with this email address', 400);
      return;
    }

    const passwordAreMatch = await bcryptjs.compare(payload.password, existingAuthor.password);

    if (!passwordAreMatch) {
      errorResponse(res, 'Invalid Credential', 500);
      return;
    }

    const token: string = signToken(existingAuthor.id, existingAuthor.email, existingAuthor.name);

    const data = {
      name: existingAuthor.name,
      email: existingAuthor.email,
      birthdate: existingAuthor.birthdate,
      token,
    };

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
