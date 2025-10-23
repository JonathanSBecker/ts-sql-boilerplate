import { check } from 'express-validator';

export interface UpdateUserPreferenceTermsAndConditionsAcceptedRequest {
  termsAndConditionsAccepted: boolean;
}

export const updateUserPreferenceTermsAndConditionsAcceptedValidation = [
  check('termsAndConditionsAccepted').isBoolean().trim().escape(),
];
