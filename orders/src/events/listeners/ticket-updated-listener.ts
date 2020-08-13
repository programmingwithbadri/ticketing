import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from '@dev-ticketing/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from '../constants';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findOne({
            _id: data.id,
            // Ticket is updated in the Tickets service and the version will be incremented by 1.
            // To find the correct ticket, we need to decrement by 1 in the orders service(Ticket Db)
            version: data.version - 1
        })

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        const { title, price } = data;
        ticket.set({ title, price });
        await ticket.save();

        msg.ack();
    }
}
