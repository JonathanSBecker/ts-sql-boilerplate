import { check } from 'express-validator';

export interface UpdateUserPreferenceUseEmailMfaRequest {
  useEmailMfa: boolean;
}

export const updateUserPreferenceUseEmailMfaValidation = [
  check('useEmailMfa').isBoolean().trim().escape(),
];
