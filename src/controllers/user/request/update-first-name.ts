import { check } from 'express-validator';

export interface UpdateUserFirstNameRequest {
  firstName: string;
}

export const updateUserFirstNameValidation = [
  check('firstName').isLength({ min: 1 }).trim().escape(),
];
