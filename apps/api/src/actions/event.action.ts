import prisma from '@/prisma';
import { IEvent } from '@/interfaces/event.interface';
import { IEventCategory } from '@/interfaces/event.interface';


class EventAction {

  findEventByAllDataExceptOrganizerIdAndCategory = async (
    event_name: string, 
    event_description: string, 
    original_price: number, 
    start_date: Date, 
    end_date: Date,
    location_id: number,
    total_seats: number) => {
    try {
      const event = await prisma.event.findFirst({
        where: {
          AND: [
            {event_name},
            {event_description},
            {original_price},
            {start_date},
            {end_date},
            {location_id},
            {total_seats}
          ],
        },
      });

      return event;
    } catch (error) {
      throw error;
    }
  };


  findEventById = async (event_id: number) => {
    try {
      const event = await prisma.event.findUnique({
        where: {
          event_id : Number(event_id),
        },
      });

      return event;
    } catch (error) {
      throw error;
    }
  };

  createEvent = async (
    {
      organizer_id, 
      event_name, 
      event_description, 
      original_price, 
      start_date, 
      end_date,
      location_id,
      total_seats,
      earlybird_promo 
    }: IEvent,
    {
      category_id
    }: IEventCategory,
    ) => {
    try {

      // Check if organizer_id exists and is an organizer
      const organizer = await prisma.user.findUnique({
        where: { user_id: organizer_id },
      });

      if (organizer?.role_id !== 2) {
        throw new Error('User is not exist or not an organizer');
      }

      const isDuplicate = await this.findEventByAllDataExceptOrganizerIdAndCategory( 
        event_name, 
        event_description, 
        original_price, 
        start_date, 
        end_date,
        location_id,
        total_seats );
      if (isDuplicate) throw new Error('The same exact event already exists');

      const event = await prisma.event.create({
        data: {
          organizer_id, 
          event_name, 
          event_description, 
          original_price, 
          start_date, 
          end_date,
          location_id,
          total_seats,
          available_seats: total_seats,
          earlybird_promo
        },
      });

      const event_category = await prisma.event_Category.create({
        data: {
          event_id: event.event_id,
          category_id
        },
      });

      const data = {...event, ...event_category}
      return data;
    } catch (error) {
      throw error;
    }
  };

  getEvents = async (textInput: string, location: number | null, category: number | null, page: number) => {
    const whereClause: any = {
      OR: [
        {
          event_name: { contains: textInput },
        },
        {
          event_description: { contains: textInput },
        },
      ],
    };

    if (location) {
      whereClause.location_id = location;
    }

    if (category) {
      whereClause.categories = {
        some: {
          category_id: category,
        },
      };
    }

    const events = await prisma.event.findMany({
      skip: (Number(page) - 1) * Number(6),
      take: Number(6),
      where: whereClause,
      include: {
        categories: true,
      },
    });

    const total_count = await prisma.event.count({
      where: whereClause,
    });

    return { events, total_count };
  };

  createTransaction = async (user_id: number, event_id: number, number_of_ticket: number) => {
    try {
      const userDiscount = await prisma.userDiscount.findFirst({
        where: {
          user_id: user_id,
          is_redeemed: false,
        },
      });

      const event = await prisma.event.findUnique({
        where: {
          event_id: event_id,
        },
      });

      if (!event) {
        throw new Error('Event not found');
      }

      let final_price = event.original_price;
      let discount_applied = 0;
      let earlybird_applied = 0;
      let type = 'free';

      if (event.original_price != 0) {
        type = 'paid';
        if (userDiscount) {
          discount_applied = (event.original_price * userDiscount.discount_percentage.toNumber()) / 100;
          final_price -= discount_applied;
          
        }

        const currentDate = new Date();
        console.log('currentdate',currentDate)
        const startDate = new Date(event.start_date);
        console.log(startDate)

        const thirtyDaysBeforeStart = new Date(startDate.getTime() - (30 * 24 * 60 * 60 * 1000));
        console.log(thirtyDaysBeforeStart)


        if (event.earlybird_promo && currentDate > thirtyDaysBeforeStart) {
          earlybird_applied = (final_price * 0.07);
          final_price -= earlybird_applied;
        }
      } 

      final_price = number_of_ticket*final_price

      const transaction = await prisma.transaction.create({
        data: {
          event_id: event_id,
          user_id: user_id,
          number_of_ticket: number_of_ticket,
          type: type,
          final_price: final_price,
          discount_applied: discount_applied,
          earlybird_applied: earlybird_applied,
          points_redeemed: 0,
          ticket_status: 'pending',
        },
      });

      if (userDiscount) {
        await prisma.userDiscount.update({
          where: {
            discount_id: userDiscount.discount_id,
          },
          data: {
            is_redeemed: true,
          },
        });
      }

      return transaction;
    } catch (error) {
      throw error;
    }
  };
  confirmPayment = async (transaction_id: number) => {
    try {
      const transaction = await prisma.transaction.update({
        where: { transaction_id },
        data: { ticket_status: 'success-paid' },
      });
      return transaction;
    } catch (error) {
      throw error;
    }
  };

// saya tambahin ini ya mba
findEventsByOrganizerId = async (query: any) => {
  const { organizer_id } = query;

  if (!organizer_id) {
    throw new Error('Organizer ID is required');
  }

  try {
    const events = await prisma.event.findMany({
      select: {
        event_id: true,
        organizer_id: true,
        event_name: true,
        event_description: true,
        original_price: true,
        start_date: true,
        end_date: true,
        total_seats: true,
        available_seats: true,
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        location: {
          select: {
            city_name: true,
          },
        },
      },
      where: {
        organizer_id,
      },
    });

    return events;
  } catch (error) {
    throw error;
  }
};

findEventsStatisticsByOrganizerId = async (organizer_id: number) => {
  const eventCount = await prisma.event.count({
    where: {
      organizer_id,
    },
  });

  const totalSeats = await prisma.event.aggregate({
    _sum: {
      total_seats: true,
    },
    where: {
      organizer_id,
    },
  });

  const availableSeats = await prisma.event.aggregate({
    _sum: {
      available_seats: true,
    },
    where: {
      organizer_id,
    },
  });

  const completedEvents = await prisma.event.count({
    where: {
      organizer_id,
      end_date: {
        lt: new Date(), // Less than current date
      },
    },
  });

  const eventsByLocation = await prisma.event.groupBy({
    by: ['location_id'],
    _count: {
      event_id: true,
    },
    where: {
      organizer_id,
    },
  });

  // Fetch city_names dari table location
  const locationIds = eventsByLocation.map(loc => loc.location_id);
  const locations = await prisma.location.findMany({
    where: {
      location_id: {
        in: locationIds
      }
    },
    select: {
      location_id: true,
      city_name: true,
    }
  });

  const eventsByPrice = await prisma.event.groupBy({
    by: ['original_price'],
    _count: {
      event_id: true,
    },
    where: {
      organizer_id,
    },
  });

  // Map location_id ke city_name
  const eventsByLocationWithCity = eventsByLocation.map(eventLoc => {
    const location = locations.find(loc => loc.location_id === eventLoc.location_id);
    return {
      city_name: location?.city_name || `Location ${eventLoc.location_id}`,
      event_count: eventLoc._count.event_id,
    };
  });

  return {
    eventCount,
    totalSeats: totalSeats._sum.total_seats || 0,
    availableSeats: availableSeats._sum.available_seats || 0,
    completedEvents,
    eventsByLocation: eventsByLocationWithCity,
    eventsByPrice,
  };
};
}

export default new EventAction();
