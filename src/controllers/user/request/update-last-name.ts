import { check } from 'express-validator';

export interface UpdateUserLastNameRequest {
  lastName: string;
}

export const updateUserLastNameValidation = [
  check('lastName').isLength({ min: 1 }).trim().escape(),
];
