import nats from 'node-nats-streaming';

console.clear();

// Client
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// Listen on connect event
stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  // Publish an event to the nats streaming server
  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});
