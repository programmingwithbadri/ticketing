import { Publisher, OrderCreatedEvent, Subjects } from '@dev-ticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
