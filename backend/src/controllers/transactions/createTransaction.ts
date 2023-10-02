import { ArgumentValidationError } from 'errors';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';

import { transactionService, userService } from 'services';
import { errorHandlerWrapper } from 'utils';

export const createTransactionValidator = () => {
  return [
    body('senderId')
      .notEmpty()
      .withMessage('SenderId is required'),
    body('receiverId')
      .notEmpty()
      .withMessage('ReceiverId is required'),
    body('amount')
      .notEmpty()
      .withMessage('Amount is required'),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  senderId: string,
  receiverId: string,
  amount: number,
};
type ReqQuery = unknown;

export const createTransactionHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const {
    senderId,
    receiverId,
    amount,
  } = req.body;

  if (senderId === receiverId) {
    throw new ArgumentValidationError('Invalid Arguments', [
      'SenderId and ReceiverId should not be the same!',
    ]);
  }

  if (amount <= 0) {
    throw new ArgumentValidationError('Invalid Arguments', [
      'Amount should not be less than 0!',
    ]);
  }

  const sender = await userService.getUser({
    id: senderId
  });

  if (!sender) {
    throw new ArgumentValidationError('Invalid Arguments', [
      'Sender is not exist!',
    ]);
  }

  if (sender.balance < amount) {
    throw new ArgumentValidationError('Invalid Arguments', [
      'Sender has not enough balance!',
    ]);
  }

  const receiver = await userService.getUser({
    id: receiverId
  });

  if (!receiver) {
    throw new ArgumentValidationError('Invalid Arguments', [
      'Receiver is not exist!',
    ]);
  }

  await userService.updateUser({
    id: senderId
  }, {
    balance: sender.balance - amount
  });

  await userService.updateUser({
    id: receiverId
  }, {
    balance: receiver.balance + amount
  });

  const result = await transactionService.createTransaction({
    senderId,
    receiverId,
    amount,
  });

  return res.status(httpStatus.OK).json({
    message: 'Success',
    result: {
      id: result.id,
      senderId: result.senderId,
      receiverId: result.receiverId,
      amount: result.amount,
    }
  });
};

export const createTransaction = errorHandlerWrapper(createTransactionHandler);
