import { Request, Response } from 'express';

import { deleteUser } from '../../db/users';

/**
 * @api {DEL} /api/access/delete Delete User
 * @apiName DeleteUser
 * @apiGroup Access
 *
 * @apiSuccess 205 Empty response status code
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 500 System Error
 */
const deleteUserRoute = async (req: Request, res: Response) => {
  await deleteUser(res.locals.context.user.uuid);

  return res.status(205).send();
};

export default deleteUserRoute;
