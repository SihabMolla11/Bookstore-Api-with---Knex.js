import { userType } from '../../types/user';

declare global {
  namespace Express {
    interface Request {
      user?: userType;
    }
  }
}
