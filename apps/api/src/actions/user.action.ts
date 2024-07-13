import prisma from '@/prisma';
import { IUser } from '@/interfaces/user.interface';

class UserAction {
  findUserByEmailOrUsername = async (username: string, email: string) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  findUserById = async (user_id: number) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          user_id,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  createUser = async ({
    username,
    email,
    password,
    first_name,
    last_name,
    referral_code,
    point_balance,
    role_id,
  }: IUser) => {
    try {
      const isDuplicate = await this.findUserByEmailOrUsername(username, email);
      if (isDuplicate) throw new Error('Username or email already exists');

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
          first_name,
          last_name,
          referral_code: referral_code || null, // Handle optional fields
          point_balance,
          role_id,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  getUsers = async () => {
    const users = await prisma.user.findMany();

    return users;
  };
}

export default new UserAction();
