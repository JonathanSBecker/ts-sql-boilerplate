import { check } from 'express-validator';

export interface UpdateUserPreferenceUseSmsMfaRequest {
  useSmsMfa: boolean;
}

export const updateUserPreferenceUseSmsMfaValidation = [
  check('useSmsMfa').isBoolean().trim().escape(),
];
