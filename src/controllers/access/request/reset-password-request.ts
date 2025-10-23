import { check } from 'express-validator';

export type RequestPasswordResetRequest = {
  email: string;
};

export const resetPasswordRequestValidation = [
  check('email').isLength({ min: 1 }).trim().escape(),
];
