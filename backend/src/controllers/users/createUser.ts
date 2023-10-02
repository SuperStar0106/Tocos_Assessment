import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';

import { userService } from 'services';
import { errorHandlerWrapper } from 'utils';

export const createUserValidator = () => {
  return [
    body('balance')
      .notEmpty()
      .withMessage('Balance is required'),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  balance: number,
};
type ReqQuery = unknown;

export const createUserHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { balance } = req.body;

  const result = await userService.createUser({
    balance,
  });

  return res.status(httpStatus.OK).json({
    message: 'Success',
    result: {
      id: result.id,
      balance: result.balance,
    }
  });
};

export const createUser = errorHandlerWrapper(createUserHandler);
