import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { transactionService } from 'services';
import { errorHandlerWrapper } from 'utils';

export const getTransactionsValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getTransactionsHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const transactions = await transactionService.getTransactions({});

  return res.status(httpStatus.OK).json({
    message: 'Success',
    result: transactions,
  });
};

export const getTransactions = errorHandlerWrapper(getTransactionsHandler);
