import { Request, Response } from 'express';

import { invalidateSession } from '../../utils/sessions';

/**
 * @api {POST} /api/access/logout Logout
 * @apiName Logout
 * @apiGroup Access
 *
 * @apiSuccess 205 Empty response status code
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 500 System Error
 */
export const logoutRoute = async (req: Request, res: Response) => {
  await invalidateSession(res.locals.context.session.uuid);
  return res.status(205).send();
};

export default logoutRoute;
