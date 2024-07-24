import { Request, Response, NextFunction } from 'express';
import { IEvent, IEventCategory } from '@/interfaces/event.interface';
import eventAction from '@/actions/event.action';

export class EventController {
  createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        organizer_id, 
        event_name, 
        event_description, 
        original_price, 
        start_date, 
        end_date,
        location_id,
        total_seats,
        earlybird_promo,
        category_id // Extract category_id from request body
      }: IEvent & IEventCategory = req.body;

      const event = await eventAction.createEvent({
        organizer_id, 
        event_name, 
        event_description, 
        original_price, 
        start_date, 
        end_date,
        location_id,
        total_seats,earlybird_promo
      }, 
      {
        category_id // Pass category_id to the createEvent function
      });

      return res.status(201).json({
        message: 'Create event success',
        data: event,
      });
    } catch (error) {
      next(error);
    }
  };

  createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, event_id, number_of_ticket } = req.body;
      const transaction = await eventAction.createTransaction(user_id, event_id, number_of_ticket);


      return res.status(201).json({
        message: 'Create transaction success',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  };

  confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { transaction_id } = req.params;
      console.log('transaction_id',transaction_id)
      const transaction = await eventAction.confirmPayment(Number(transaction_id));
      res.status(200).json({
        message: 'Payment confirmed successfully',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  };

  getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        textInput = '',
        location,
        category,
        page = 1,
      } = req.query;

      const { events, total_count } = await eventAction.getEvents(
        String(textInput),
        location ? Number(location) : null,
        category ? Number(category) : null,
        Number(page)
      );

      res.status(200).json({
        message: 'Get events success',
        data: events,
        total_count: total_count,
      });
    } catch (error) {
      next(error);
    }
  };


  getEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { event_id } = req.params;
      const event = await eventAction.findEventById(Number(event_id));

      res.status(200).json({
        message: 'Get event success',
        data: event,
      });
    } catch (error) {
      next(error);
    }
  };


  async getEventsForReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const events = await eventAction.getEventsForReview(userId);

      res.status(200).json({
        message: 'Events fetched successfully',
        data: events
      });
    } catch (error) {
      next(error);
    }
  }

  async postReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id, event_id, rating, comment } = req.body;
      const review = await eventAction.postReview(user_id, event_id, rating, comment);

      res.status(200).json({
        message: 'Review posted successfully',
        data: review
      });
    } catch (error) {
      next(error);
    }
  }
  
  // saya tambahin ini ya mba
  getEventsByOrganizerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizer_id = parseInt(req.params.organizer_id)
      const events = await eventAction.findEventsByOrganizerId({organizer_id});

      res.status(200).json({
        message: 'Get events success',
        data: events,
      });
    } catch (error) {
      next(error);
    }
  };

  getEventsStatisticsByOrganizerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizer_id = parseInt(req.params.organizer_id);
      const statistics = await eventAction.findEventsStatisticsByOrganizerId(organizer_id);

      res.status(200).json({
        message: 'Get statistics success',
        data: statistics,
      });
    } catch (error) {
      next(error);
    }
  };

  getTransactionsByOrganizerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { organizer_id } = req.params;
      const transactions = await eventAction.getTransactionsByOrganizerId(Number(organizer_id));
      res.status(200).json({
        message: 'Get transactions by organizer success',
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  };

}
