import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';

export const errorHandlerWrapper = (
  func: (
    req: Request<unknown, unknown, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      }

      await func(req, res, next);
    } catch (err: unknown) {
      next(err);
    }
  };
};
