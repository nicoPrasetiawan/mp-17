import prisma from '@/prisma';
import { IUser } from '@/interfaces/user.interface';

// Function to generate a random string
function generateReferralCode(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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

      // Check if the provided referral_code exists
      if (referral_code) {
        const referrer = await prisma.user.findUnique({
          where: { own_referral_code: referral_code },
        });

        if (!referrer) {
          throw new Error('Invalid referrer code');
        }
      }

      // Generate a new unique referral code for the user
      const ownReferralCode = generateReferralCode(5);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
          first_name,
          last_name,
          referral_code: referral_code || null, // Handle optional fields
          own_referral_code: ownReferralCode,
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
