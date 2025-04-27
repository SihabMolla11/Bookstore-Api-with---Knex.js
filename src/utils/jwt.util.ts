import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey: any = process.env.JWT_SECRET;
const expireTime: any = process.env.JWT_EXPIRES_IN;

export const signToken = (id: number, email: string, name: string): string => {
  const payload = { id, email, name };
  return jwt.sign(payload, secretKey, { expiresIn: expireTime });
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
