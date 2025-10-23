import { check } from 'express-validator';

export interface UpdateUserEmailRequest {
  email: string;
}

export const updateUserEmailValidation = [
  check('email').isLength({ min: 1 }).trim().escape(),
];
