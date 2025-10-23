import { Request, Response } from 'express';

import UnauthorizedError from '../../error/UnauthorizedError';
import { invalidateSessionsForUser } from '../../utils/sessions';

const invalidateSession = async (req: Request, res: Response) => {
  const user = res.locals.user;
  if (!user) {
    throw new UnauthorizedError();
  }
  await invalidateSessionsForUser(user.uuid);
  return res.status(200).send();
};

export default invalidateSession;
