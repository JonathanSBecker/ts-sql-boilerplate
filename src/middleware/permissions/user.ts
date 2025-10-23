import { NextFunction, Request, Response } from 'express';

import ForbiddenError from '../../error/ForbiddenError';

const checkPermissionsUser = (
  req: Request<{ uuid: string }, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  if (
    !(res.locals.context.user.uuid === req.params.uuid) &&
    !res.locals.context.isObserveStaff
  ) {
    throw new ForbiddenError();
  }
  return next();
};

export default checkPermissionsUser;
