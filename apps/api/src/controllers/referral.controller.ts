import { Request, Response, NextFunction } from 'express';
import referralAction from '@/actions/referral.action';

export class ReferralController {
  getValidityByReferralCode = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { referral_code } = req.params;

      const referralData = await referralAction.getValidityByReferralCode(referral_code);

      if (!referralData) {
        return res.status(404).json({
          message: 'Referral code not found',
        });
      }

      res.status(200).json({
        message: 'Get data success',
        data: referralData,
      });
    } catch (error) {
      next(error);
    }
  };
}
