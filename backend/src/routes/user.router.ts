import express from 'express';

import {
  userController,
} from '../controllers';

const userRouter = express.Router();

// Get users
userRouter.get(
  '/',
  userController.getUsersValidator(),
  userController.getUsers
);

// Get a user
userRouter.get(
  '/:id',
  userController.getUserValidator(),
  userController.getUser
);

// Create a user
userRouter.post(
  '/',
  userController.createUserValidator(),
  userController.createUser
);

export default userRouter;
