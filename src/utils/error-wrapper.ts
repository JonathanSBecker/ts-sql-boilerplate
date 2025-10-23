import { NextFunction, Request, Response } from 'express';

import errorHandler from '../middleware/error/error-handler';

// THIS IS SUPPOSED TO BE SIMPLE
// DO NOT MODIFY THIS FILE IF YOU DON'T HAVE A REASON TO
const errorWrapper = (
  handler: (req: Request<any>, res: Response, next: NextFunction) => void,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // DO NOT REMOVE AWAIT
      await handler(req, res, next);
    } catch (error) {
      errorHandler(error as Error, req, res, next);
    }
  };
};

export default errorWrapper;
