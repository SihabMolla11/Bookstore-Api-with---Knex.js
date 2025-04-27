import { Response } from 'express';

const errorMessage = (res: Response, message: string, statusCode: number) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMessage;
