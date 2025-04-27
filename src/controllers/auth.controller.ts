import { Request, Response } from 'express';
import errorMessage from '../utils/error-message';
import authorValidationType from '../validator/author.validator';
import { registrationService } from '../services/auth.service';

export const registrationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { body } = req;

    const validation = authorValidationType.validate(body);

    if (validation?.error) {
      errorMessage(res, validation.error.details[0].message, 500);
    }

    const response = await registrationService(validation?.value)


    res.status(201).json(validation);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
