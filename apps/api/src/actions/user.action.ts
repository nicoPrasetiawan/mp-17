import prisma from '@/prisma';

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

  findUserByUsername = async (username: string) => {
    try {
      const user = await prisma.user.findFirst({
        select: {
          user_id: true,
          username: true,
          email: true,
          first_name: true,
          last_name: true,
          password: true,
          role_id: true,
          point_balance: true,
          own_referral_code: true,
          role: {
            select: {
              role_name: true,
            },
          },
        },
        where: {
          username,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (
    user_id: number,
    updateData: { first_name?: string; last_name?: string; email?: string },
  ) => {
    try {
      const updatedUser = await prisma.user.update({
        where: { user_id },
        data: updateData,
      });
      return updatedUser;
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
