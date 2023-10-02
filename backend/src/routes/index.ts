import express from 'express';

import userRouter from './user.router';
import transactionRouter from './transaction.router';

const appRoutes = express.Router();

appRoutes.use('/users', userRouter);
appRoutes.use('/transactions', transactionRouter);

export default appRoutes;
