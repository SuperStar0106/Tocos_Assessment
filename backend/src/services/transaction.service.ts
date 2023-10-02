import { Transaction } from 'models';
import { ITransaction } from 'types';

export const createTransaction = async (data: Pick<ITransaction, 'senderId' | 'receiverId' | 'amount'>) => {
  const user = new Transaction(data);
  const result = await user.save();
  return result;
};

export const getTransactions = async (data: Partial<Pick<ITransaction, 'senderId' | 'receiverId'>>) => {
  const users = await Transaction.find(data, {
    _id: false,
    id: true,
    senderId: true,
    receiverId: true,
    amount: true,
  });
  return users;
};