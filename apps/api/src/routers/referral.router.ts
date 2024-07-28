import { Router } from 'express';
import { ReferralController } from '@/controllers/referral.controller';

export class ReferralRouter {
  private router: Router = Router();
  private referralController = new ReferralController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/referral/:referral_code',
      this.referralController.getValidityByReferralCode,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
