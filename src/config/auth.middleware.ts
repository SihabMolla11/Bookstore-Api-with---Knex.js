import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.util';

export interface userType {
  id: number;
  email: string;
  name: string;
}

interface AuthRequest extends Request {
  user?: userType;
}

const authGard = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const header = req.header('Authorization');
    if (!header || !header.startsWith('Bearer')) {
      res.status(401).json({ error: 'Unauthorized User' });
      return;
    }

    const token = header.split(' ')[1];
    const decodedToken = verifyToken(token) as userType;

    req.user = { id: decodedToken.id, name: decodedToken.name, email: decodedToken.name };
    next();
  } catch (error) {
    res.status(403).json({ error: 'Unauthorized User' });
    return;
  }
};

export default authGard;
