import { Error } from 'mongoose';

export const extractValidationMessage = (err: Error.ValidationError | null) => {
  let message = '';

  if (err?.errors) {
    message = Object.keys(err.errors)
      .map((k) => {
        const v = err.errors[k];
        return `${v.path}: ${v.message}`;
      })
      .join(', ');
  }

  return message;
};
