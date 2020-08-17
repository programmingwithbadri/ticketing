import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@dev-ticketing/common';
import { queueGroupName } from '../constants';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {

    }
}
