import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '@/types/express';

// To verify if the token still valid
export class AuthMiddleware {
  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw new Error('Missing Token');

      const isTokenValid = verify(token, String(process.env.API_KEY));
      if (!isTokenValid) throw new Error('Unauthorized');

      req.user = isTokenValid as User;

      next();
    } catch (error) {
      next(error);
    }
  };
}
