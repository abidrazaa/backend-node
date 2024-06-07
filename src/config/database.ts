import Mongoose from 'mongoose';
import logger from '@utils/logger';
import { DB_CON_STRING, DO_SEEDING } from '@constants/app';
import seed from '@seed/index';

export default () => {
  new Promise((resolve, reject) => {
    Mongoose.set('strictQuery', false);
    Mongoose.connect(DB_CON_STRING)
      .then(() => {
        logger.info('⛁  Database connection successful!');

        if (DO_SEEDING) {
          // Seed the database if 'true'
          seed();
        }
        resolve(true);
      })
      .catch((err) => {
        logger.error(err);
        reject(err);
      });
  });
};
