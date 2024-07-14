import { Request, Response, NextFunction } from 'express';
import { IUser } from '@/interfaces/user.interface';
import userAction from '@/actions/user.action';
import { User } from '@/types/express';

export class UserController {
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        username,
        email,
        password,
        first_name,
        last_name,
        referral_code,
        own_referral_code,
        point_balance,
        role_id,
      }: IUser = req.body;

      const user = await userAction.createUser({
        username,
        email,
        password,
        first_name,
        last_name,
        referral_code,
        own_referral_code,
        point_balance,
        role_id,
      });

      return res.status(201).json({
        message: 'Create user success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      const user = await userAction.login(username, password);

      res.status(200).json({
        message: 'Log in success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userAction.getUsers();

      res.status(200).json({
        message: 'Get users success',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.user as User;

      const user = await userAction.findUserByUsername(username);

      res.status(200).json({
        message: 'Get user success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
