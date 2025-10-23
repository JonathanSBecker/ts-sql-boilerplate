import { check } from 'express-validator';

export interface UpdateUserPreferenceSessionLengthRequest {
  sessionLength: number;
}

export const updateUserPreferenceSessionLengthValidation = [
  check('sessionLength').isNumeric().trim().escape(),
];
