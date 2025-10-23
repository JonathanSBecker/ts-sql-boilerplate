import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error });
  }
  return next();
};

export default validateRequest;
