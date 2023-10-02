import { User } from 'models';
import { IUser } from 'types';

export const createUser = async (data: Pick<IUser, 'balance'>) => {
  const user = new User(data);
  const result = await user.save();
  return result;
};

export const getUser = async (data: Pick<IUser, 'id'>) => {
  const users = await User.findOne(data, {
    _id: false,
    id: true,
    balance: true,
  });
  return users;
};

export const getUsers = async (data: Partial<Pick<IUser, 'id'>>) => {
  const users = await User.find(data, {
    _id: false,
    id: true,
    balance: true,
  });
  return users;
};

export const updateUser = async (filter: Pick<IUser, 'id'>, data: Pick<IUser, 'balance'>) => {
  const user = await User.updateOne(filter, data);
  return user;
};