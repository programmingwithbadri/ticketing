import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@dev-ticketing/common';
import { queueGroupName } from '../constants';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Waiting this many milliseconds to process the job:', delay);

        await expirationQueue.add(
            {
                orderId: data.id,
            },
            {
                delay, // How long to have the job inside the queue
            }
        );

        msg.ack();
    }
}
