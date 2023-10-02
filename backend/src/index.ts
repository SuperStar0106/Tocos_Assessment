import express from 'express';

import {
  backendSetup,
  databaseSetup
} from './setup';

const app = express();
let server;

databaseSetup(() => {
  server = backendSetup(app);
});

export {
  app,
  server,
};