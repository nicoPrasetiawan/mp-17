import prisma from '@/prisma';
import { IUser } from '@/interfaces/user.interface';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

// Function to generate a random string
function generateReferralCode(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Function to hashing password
async function hashingPassword(password: string) {
  const salt = await genSalt(10);
  const hashedPass = await hash(password, salt);

  return hashedPass;
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

  findUserByUsername = async (username: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
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

      // Hash password
      const hashedPass = await hashingPassword(password);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPass,
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

  login = async (username: string, password: string) => {
    try {
      const user = await prisma.user.findFirst({
        select: {
          username: true,
          email: true,
          first_name: true,
          last_name: true,
          password: true,
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

      if (!user) throw new Error('Incorrect email or password');

      // hashed assword comparison
      const isPassValid = await compare(password, user.password);
      if (!isPassValid) throw new Error('Incorrect email or password');

      const payload = {
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role_name: user.role.role_name,
      };

      const token = sign(payload, String(process.env.API_KEY), {
        expiresIn: '1hr',
      });

      return token;
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
