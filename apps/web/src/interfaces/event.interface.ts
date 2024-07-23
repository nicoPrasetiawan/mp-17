export interface IEvent {
    earlybird_promo: any;
    organizerId: number;
    eventName: string;
    eventDescription: string;
    startDate: Date | null;
    endDate: Date | null;
    ticketType: string;
    originalPrice: number;
    location: number;
    category: number;
    totalSeats: number;
  }