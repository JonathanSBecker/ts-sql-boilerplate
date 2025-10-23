import { check } from 'express-validator';

export const updatePasswordValidation = [
  check('currentPassword').isLength({ min: 1 }).trim().escape(),
  check('newPassword').isLength({ min: 1 }).trim().escape(),
];

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
