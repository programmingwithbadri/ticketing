import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

// Add the signin method to global
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: any;

// Before any test is started
beforeAll(async () => {
  process.env.JWT_KEY = "testJwtKey";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Before each test starts
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  // Reset all the existing collection existing in testing db
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// After all tests are completed
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// We can instead create helper method instead of global function
global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};