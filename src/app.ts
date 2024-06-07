import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import '@config/env';
import db from '@config/database';
import { routes } from '@routes/routes';
import { APP_PORT, IS_DEV } from '@constants/app';
import apiRules from '@middlewares/api-rules';
import errorHandler from '@middlewares/error';
import logRequest from '@middlewares/request-logger';
import logger from '@utils/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = async () => {
  const app = express();

  // To access public folder
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../public')));

  app.use(logRequest);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(apiRules);

  db();

  Object.keys(routes).forEach((key) => {
    app.use(key, routes[key]);
  });

  app.use(errorHandler);

  app.listen(APP_PORT, () => {
    if (IS_DEV) {
      console.log(``);
      logger.info(`Node Express server ready`);
      logger.info(`➜  Server: http://localhost:${APP_PORT}`);
    }
  });
};

main();
