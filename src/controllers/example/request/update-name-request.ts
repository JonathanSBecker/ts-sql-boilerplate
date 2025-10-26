import { check } from 'express-validator';

export type UpdateExampleNameRequest = {
  name: string;
}

export const updateExampleNameValidation = [
  check('name').isLength({ min: 1 }).trim().escape(),
]
