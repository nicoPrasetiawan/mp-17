import { Request, Response, NextFunction } from 'express';
import userAction from '@/actions/user.action';
import { User } from '@/types/express';

export class UserController {
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

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.params;
    const { first_name, last_name, email } = req.body;

    const updateData: { first_name?: string; last_name?: string; email?: string } = {};

    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (email) updateData.email = email;

    const updatedUser = await userAction.updateUser(Number(user_id), updateData);

    res.status(200).json({
      message: 'Update user success',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
}
