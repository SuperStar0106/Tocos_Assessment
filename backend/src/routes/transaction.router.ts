import express from 'express';

import {
  transactionController,
} from '../controllers';

const transactionRouter = express.Router();

// Get transactions
transactionRouter.get(
  '/',
  transactionController.getTransactionsValidator(),
  transactionController.getTransactions
);

// Create a transaction
transactionRouter.post(
  '/',
  transactionController.createTransactionValidator(),
  transactionController.createTransaction
);

export default transactionRouter;
