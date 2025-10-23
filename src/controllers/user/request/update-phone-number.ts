import { check } from 'express-validator';

export interface UpdateUserPhoneNumberRequest {
  phoneNumber: string;
}

export const updateUserPhoneNumberValidation = [
  check('phoneNumber').isLength({ min: 1 }).trim().escape(),
];
