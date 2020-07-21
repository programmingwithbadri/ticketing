import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

let mongo: any;

// Before any test is started
beforeAll(async () => {
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
