import { check } from 'express-validator';

// username can be username or email
export type LoginRequest = {
  username: string;
  password: string;
};

export const loginValidation = [
  check('username').isLength({ min: 1 }).trim().escape(),
  check('password').isLength({ min: 1 }).trim().escape(),
];
