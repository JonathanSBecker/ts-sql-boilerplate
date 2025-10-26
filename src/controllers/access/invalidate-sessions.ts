import { Request, Response } from 'express';

import UnauthorizedError from '../../error/UnauthorizedError';
import { invalidateSessionsForUser } from '../../utils/sessions';

/**
 * @api {POST} /api/access/invalidate-sessions Invalidate User Sessions
 * @apiName InvalidateUserSessions
 * @apiGroup Access
 *
 * @apiSuccess 205 Empty response status code
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 500 System Error
 */
const invalidateSession = async (req: Request, res: Response) => {
  const user = res.locals.user;
  if (!user) {
    throw new UnauthorizedError();
  }
  await invalidateSessionsForUser(user.uuid);
  return res.status(205).send();
};

export default invalidateSession;
