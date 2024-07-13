import { UserController } from '@/controllers/user.controller';
import { Router } from 'express';

export class UserRouter {
  private router: Router = Router();
  private userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.userController.createUser);
    this.router.get('/users', this.userController.getUsers);
    this.router.get('/user/:user_id', this.userController.getUser);
  }

  getRouter(): Router {
    return this.router;
  }
}
