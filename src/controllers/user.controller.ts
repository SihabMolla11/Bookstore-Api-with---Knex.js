import { Request, Response } from 'express';
import { getAuthorById, getUserProfile, updateAuthor } from '../models/author.model';
import errorResponse from '../utils/error-message';
import { updateAuthorDTO } from '../validator/author.validator';

export const getUserProfileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;
    const userData = await getUserProfile(user.id);

    if (!userData) {
      errorResponse(res, 'User not found', 400);
      return;
    }

    res.status(201).json({ success: true, data: userData });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, body: payload }: any = req;

    const validation = updateAuthorDTO.validate(payload);

    if (validation?.error) {
      errorResponse(res, validation.error.details[0].message, 500);
      return;
    }

    const existingUser = await getAuthorById(user.id);

    if (!existingUser && existingUser.email === user.email) {
      errorResponse(res, 'User not found', 400);
      return;
    }

    const updateUser = await updateAuthor(existingUser.id, payload);

    res.status(201).json({ success: true, data: updateUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
