export const IS_DEV = process.env.NODE_ENV !== 'production';
export const APP_PORT = process.env.PORT;
export const JWT_SECRET_KEY = process.env.TOKEN_KEY;
export const DB_CON_STRING = process.env.DB_CON_STRING;
export const DO_SEEDING = process.env.DO_SEEDING == 'true';
