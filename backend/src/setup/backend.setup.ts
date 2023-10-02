import { json as bodyParserJSON } from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';

import { API_VERSION } from 'config';

import { errorHandlerMiddleware } from 'middlewares';

import appRoutes from 'routes';
import { MESSAGES } from 'consts';

const port = process.env.PORT || 8000;

const backendSetup = (app: Express) => {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParserJSON());

  // Health check
  app.use('/health', function (req, res) {
    res.send('OK');
  });

  app.use(`/api/${API_VERSION}`, appRoutes);
  app.use(errorHandlerMiddleware);

  const server = app.listen(port, () => {
    console.info(MESSAGES.SERVER_RUN_SUCCESS);
  });

  return server;
};

export default backendSetup;
