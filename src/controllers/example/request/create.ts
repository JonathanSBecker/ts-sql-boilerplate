import { check } from 'express-validator';

export type CreateExampleRequest = {
  name: string;
}

export const createExampleValidation = [
    check('name').isLength({ min: 1 }).trim().escape(),
]
