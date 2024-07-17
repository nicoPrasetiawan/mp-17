import prisma from '@/prisma';
import userAction from './user.action';
import { genSalt, hash, compare } from 'bcrypt';
import { IUser } from '@/interfaces/user.interface';
import { sign } from 'jsonwebtoken';
import { HttpException } from '@/exceptions/http.exception';

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

export class AuthAction {
  registerAction = async ({
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
      const isDuplicate = await userAction.findUserByEmailOrUsername(
        username,
        email,
      );
      if (isDuplicate)
        throw new HttpException(500, 'Username or email already exists');

      // Check if the provided referral_code exists
      if (referral_code) {
        const referrer = await prisma.user.findUnique({
          where: { own_referral_code: referral_code },
        });

        if (!referrer) {
          throw new HttpException(500, 'Invalid referrer code');
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

  loginAction = async (username: string, password: string) => {
    try {
      const user = await userAction.findUserByUsername(username);

      if (!user) throw new HttpException(500, 'Incorrect email or password');

      // hashed assword comparison
      const isPassValid = await compare(password, user.password);
      if (!isPassValid)
        throw new HttpException(500, 'Incorrect email or password');

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

  refreshTokenAction = async (username: string) => {
    try {
      const user = await userAction.findUserByUsername(username);
      if (!user) throw new HttpException(500, 'Something went wrong');

      const payload = {
        username: user.username,
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
}
