import prisma from '@/prisma';

class ReferralAction {
  getValidityByReferralCode = async (referral_code: string) => {
    try {
      const referralData = await prisma.referral.findFirst({
        select: {
          referral_code: true,
          valid_until: true,
        },
        where: {
          referral_code,
        },
        orderBy: {
          valid_until: 'desc', 
        },
      });

      return referralData;
    } catch (error) {
      throw error;
    }
  };
}

export default new ReferralAction();
