import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

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

    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('order-service'); // Used to deliver the missed events after restart/crash

    // If queue group added, nats-streaming-server will subscribe to only one client
    // This will help us to avoid having duplicate copies in DB etc
    // when multiple clients are listening for the event.
    const subscription = stan.subscribe('ticket:created', 'order-queue-group', options);

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
        }

        // Ack that the event is successfully done
        msg.ack();
    });
});

// Close the connection when the terminal is closed/ Or connection issue
process.on('SIGINT', () => stan.close()); //Interrupt connection
process.on('SIGTERM', () => stan.close()); // Terminate connection
