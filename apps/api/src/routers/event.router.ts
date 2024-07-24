import { EventController } from '@/controllers/event.controller';
import { Router } from 'express';

export class EventRouter {
  public router: Router = Router();
  public eventController = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/events', this.eventController.createEvent);
    this.router.get('/events', this.eventController.getEvents);
    this.router.get('/events/:event_id', this.eventController.getEvent);

    this.router.post('/transaction', this.eventController.createTransaction);
    this.router.patch('/payment/:transaction_id', this.eventController.confirmPayment);
    this.router.get('/events-for-review/:userId', this.eventController.getEventsForReview);
    this.router.post('/review', this.eventController.postReview);
    // saya tambahin route ini ya mba
    this.router.get(
      '/events-dashboard/:organizer_id',
      this.eventController.getEventsByOrganizerId,
    );
    this.router.get(
      '/events-statistics/:organizer_id',
      this.eventController.getEventsStatisticsByOrganizerId
    );
    this.router.get('/transactions/:organizer_id', this.eventController.getTransactionsByOrganizerId);
  }

  getRouter(): Router {
    return this.router;
  }
}
