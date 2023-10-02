import request from 'supertest';
import { app, server } from '../../src';
import mongoose from 'mongoose';
import { User } from '../../src/models';

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe('user API endpoints', () => {
  let testUser: any;

  beforeEach(async () => {
    testUser = await User.create({ balance: '1000' });
  });

  afterEach(async () => {
    await User.deleteOne({
      id: testUser.id,
    });
  });

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const users = await User.find({}, {
        _id: false,
        id: true,
        balance: true,
      });
      const response = await request(app).get('/api/v1/users');
      expect(response.status).toBe(200);
      expect(response.body.result).toHaveLength(users.length);
      expect(response.body.result[0].balance).toBe(users[0].balance);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = { balance: 9999 };
      const response = await request(app).post('/api/v1/users').send(newUser);
      expect(response.status).toBe(200);
      expect(response.body.result.balance).toBe(9999);

      await User.deleteOne({
        id: response.body.result.id,
      });
    });

    it('should return a error when balance is not specified', async () => {
      const newUser = {};
      const response = await request(app).post('/api/v1/users').send(newUser);
      expect(response.status).toBe(400);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message[0]).toBe('Balance is required');
    });
  });

  describe('GET /users/:id', () => {
    it('should get an existing user', async () => {
      const response = await request(app).get(`/api/v1/users/${testUser.id}`).send();
      expect(response.status).toBe(200);
      expect(response.body.result.id).toBe(testUser.id);
      expect(response.body.result.balance).toBe(testUser.balance);
    });

    it('should return error when id is not exist', async () => {
      const response = await request(app).get('/api/v1/users/0').send();
      expect(response.status).toBe(404);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message).toBe('User is not exist!');
    });
  });
});