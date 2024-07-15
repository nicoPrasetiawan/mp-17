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
        category_id // Extract category_id from request body
      }: IEvent & IEventCategory = req.body;

      const event = await eventAction.createEvent({
        organizer_id, 
        event_name, 
        event_description, 
        original_price, 
        start_date, 
        end_date,
        location_id 
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

  getEvents= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await eventAction.getEvents();

      res.status(200).json({
        message: 'Get users success',
        data: events,
      });
    } catch (error) {
      next(error);
    }
  };

  getEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.params;
      const event = await eventAction.findEventById(Number(user_id));

      res.status(200).json({
        message: 'Get user success',
        data: event,
      });
    } catch (error) {
      next(error);
    }
  };
}
