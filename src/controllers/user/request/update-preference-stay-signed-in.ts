import { check } from 'express-validator';

export interface UpdateUserPreferenceStaySignedInRequest {
  staySignedIn: boolean;
}

export const updateUserPreferenceStaySignedInValidation = [
  check('staySignedIn').isBoolean().trim().escape(),
];
