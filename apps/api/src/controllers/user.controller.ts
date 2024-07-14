import { Request, Response, NextFunction } from 'express';
import { IUser } from '@/interfaces/user.interface';
import userAction from '@/actions/user.action';

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
      const { user_id } = req.params;
      const user = await userAction.findUserById(Number(user_id));

      res.status(200).json({
        message: 'Get user success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
