import { check } from 'express-validator';

export interface UpdateUserUsernameRequest {
  username: string;
}

export const updateUserUsernameValidation = [
  check('username').isLength({ min: 1 }).trim().escape(),
];
