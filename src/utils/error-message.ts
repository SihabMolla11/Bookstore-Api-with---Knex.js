import { Response } from 'express';

const errorResponse = (res: Response, message: string, statusCode: number) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorResponse;
