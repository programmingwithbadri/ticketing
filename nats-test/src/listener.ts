import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    // Exit process, if close event emitted
    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    new TicketCreatedListener(stan).listen();

});

// Close the connection when the terminal is closed/ Or connection issue
process.on('SIGINT', () => stan.close()); //Interrupt connection
process.on('SIGTERM', () => stan.close()); // Terminate connection
