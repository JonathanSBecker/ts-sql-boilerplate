import { Request, Response } from 'express';

import { deactivateUser } from '../../db/users';

/**
 * @api {POST} /api/access/deactivate-user Deactivate User
 * @apiName DeactivateUser
 * @apiGroup Access
 *
 * @apiSuccess 205 Empty response status code
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 500 System Error
 */
const deactivateUserRoute = async (req: Request, res: Response) => {
  await deactivateUser(res.locals.context.user.uuid);

  return res.status(205).send();
};

export default deactivateUserRoute;
