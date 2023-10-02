import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { userService } from 'services';
import { errorHandlerWrapper } from 'utils';

export const getUsersValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getUsersHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const users = await userService.getUsers({});

  return res.status(httpStatus.OK).json({
    message: 'Success',
    result: users,
  });
};

export const getUsers = errorHandlerWrapper(getUsersHandler);
