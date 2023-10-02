import request from 'supertest';
import { app, server } from '../../src';
import mongoose from 'mongoose';
import { Transaction, User } from '../../src/models';

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe('transaction API endpoints', () => {
  let testTransaction: any;
  let sender: any;
  let receiver: any;
  const testAmount: number = 100;

  beforeEach(async () => {
    sender = await User.create({ balance: 500 });
    receiver = await User.create({ balance: 500 });

    testTransaction = await Transaction.create({
      senderId: sender.id,
      receiverId: receiver.id,
      amount: testAmount,
    });
  });

  afterEach(async () => {
    await User.deleteOne({ id: sender.id });
    await User.deleteOne({ id: receiver.id });
    await Transaction.deleteOne({ id: testTransaction.id });
  });

  describe('GET /transactions', () => {
    it('should return a list of transactions', async () => {
      const transactions = await Transaction.find({}, {
        _id: false,
        id: true,
        senderId: true,
        receiverId: true,
        amount: true,
      });

      const response = await request(app).get('/api/v1/transactions');
      expect(response.status).toBe(200);
      expect(response.body.result).toHaveLength(transactions.length);
      expect(response.body.result[0].id).toEqual(transactions[0].id);
      expect(response.body.result[0].amount).toBe(transactions[0].amount);
    });
  });

  describe('POST /users', () => {
    it('should create a new user, check amount change', async () => {
      const newTransaction = {
        senderId: sender.id,
        receiverId: receiver.id,
        amount: testAmount,
      };
      const response = await request(app).post('/api/v1/transactions').send(newTransaction);
      expect(response.status).toBe(200);
      expect(response.body.result.senderId).toBe(sender.id);
      expect(response.body.result.receiverId).toBe(receiver.id);
      expect(response.body.result.amount).toBe(testAmount);

      // get updated sender and receiver
      const updatedSender = await User.findOne({ id: sender.id });
      const updatedReceiver = await User.findOne({ id: receiver.id });
      // check updated amount
      expect(updatedSender.balance).toBe(sender.balance - testAmount);
      expect(updatedReceiver.balance).toBe(receiver.balance + testAmount);

      await Transaction.deleteOne({ id: response.body.result.id });
    });

    it('should return error when senderId is not specified', async () => {
      const newTransaction = {
        senderId: undefined,
        receiverId: receiver.id,
        amount: sender.balance,
      };
      const response = await request(app).post('/api/v1/transactions').send(newTransaction);
      expect(response.status).toBe(400);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message[0]).toBe('SenderId is required');
    });

    it('should return error when receiverId is not specified', async () => {
      const newTransaction = {
        senderId: sender.id,
        receiverId: undefined,
        amount: sender.balance,
      };
      const response = await request(app).post('/api/v1/transactions').send(newTransaction);
      expect(response.status).toBe(400);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message[0]).toBe('ReceiverId is required');
    });

    it('should return error when amount is not specified', async () => {
      const newTransaction = {
        senderId: sender.id,
        receiverId: receiver.id,
        amount: undefined,
      };
      const response = await request(app).post('/api/v1/transactions').send(newTransaction);
      expect(response.status).toBe(400);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message[0]).toBe('Amount is required');
    });

    it('should return error when sender is not exist', async () => {
      const newTransaction = {
        senderId: 0,
        receiverId: receiver.id,
        amount: sender.balance,
      };
      const response = await request(app).post('/api/v1/transactions').send(newTransaction);
      expect(response.status).toBe(400);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message[0]).toBe('Sender is not exist!');
    });


    it('should return error when receiver is not exist', async () => {
      const newTransaction = {
        senderId: sender.id,
        receiverId: 0,
        amount: sender.balance,
      };
      const response = await request(app).post('/api/v1/transactions').send(newTransaction);
      expect(response.status).toBe(400);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message[0]).toBe('Receiver is not exist!');
    });

    it('should return error when senderId and receiverId are the same', async () => {
      const newTransaction = {
        senderId: sender.id,
        receiverId: sender.id,
        amount: sender.balance,
      };
      const response = await request(app).post('/api/v1/transactions').send(newTransaction);
      expect(response.status).toBe(400);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message[0]).toBe('SenderId and ReceiverId should not be the same!');
    });

    it('should return error when amount is less than 0', async () => {
      const newTransaction = {
        senderId: sender.id,
        receiverId: receiver.id,
        amount: 0,
      };
      const response = await request(app).post('/api/v1/transactions').send(newTransaction);
      expect(response.status).toBe(400);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message[0]).toBe('Amount should not be less than 0!');
    });

    it('should return error when amount is over the sender balance', async () => {
      const newTransaction = {
        senderId: sender.id,
        receiverId: receiver.id,
        amount: 99999,
      };
      const response = await request(app).post('/api/v1/transactions').send(newTransaction);
      expect(response.status).toBe(400);
      const errorText = JSON.parse(response.error.text);
      expect(errorText.message[0]).toBe('Sender has not enough balance!');
    });
  });
});