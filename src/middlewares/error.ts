import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  res.status(500).json({ err: err?.message || 'Oops! Something broke!' });
};

export default errorHandler;
