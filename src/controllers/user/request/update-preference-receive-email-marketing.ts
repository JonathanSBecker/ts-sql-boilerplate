import { check } from 'express-validator';

export interface UpdateUserPreferenceReceiveEmailMarketingRequest {
  receiveEmailMarketing: boolean;
}

export const updateUserPreferenceReceiveEmailMarketingValidation = [
  check('receiveEmailMarketing').isBoolean().trim().escape(),
];
