import { NotFoundError } from 'errors';
import { Request, Response } from 'express';
import { param } from 'express-validator';
import httpStatus from 'http-status';

import { userService } from 'services';
import { errorHandlerWrapper } from 'utils';

export const getUserValidator = () => {
  return [
    param('id')
      .notEmpty()
      .withMessage('ID is required')
  ];
};

type Params = {
  id: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getUserHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { id } = req.params;
  const user = await userService.getUser({
    id
  });

  if (!user) {
    throw new NotFoundError('User is not exist!');
  }

  return res.status(httpStatus.OK).json({
    message: 'Success',
    result: user,
  });
};

export const getUser = errorHandlerWrapper(getUserHandler);
