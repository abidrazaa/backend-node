import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { IS_DEV } from '@constants/app';

const { timestamp, printf } = winston.format;

const devTransports = IS_DEV ? [new winston.transports.Console()] : [];

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export default winston.createLogger({
  format: winston.format.combine(timestamp(), myFormat),
  defaultMeta: { service: 'be-service' },
  transports: [
    ...devTransports,
    new DailyRotateFile({
      datePattern: '24h',
      filename: `logs/error-%DATE%.log`,
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      datePattern: '24h',
      filename: `logs/warn-%DATE%.log`,
      level: 'warn',
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      datePattern: '24h',
      filename: `logs/info-%DATE%.log`,
      level: 'info',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export const accessLogger = winston.createLogger({
  format: winston.format.combine(timestamp(), myFormat),
  defaultMeta: { service: 'be-service-access' },
  transports: [
    ...devTransports,
    new DailyRotateFile({
      datePattern: '24h',
      filename: `logs/access-%DATE%.log`,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
