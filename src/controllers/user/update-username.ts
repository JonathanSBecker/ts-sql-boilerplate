import { Request, Response } from 'express';

import { UpdateUserUsernameRequest } from './request/update-username';
import { getUserByUsername, updateUserUsername } from '../../db/users';
import ConflictError from '../../error/ConflictError';

/**
 * @api {put} /api/users/:uuid/preferences/receive-email-marketing Update User Username
 * @apiName UpdateUserUsername
 * @apiGroup User
 *
 * @apiParam {String} username The user's new username
 *
 * @apiSuccess (204) {None} No content
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 404 Not Found Error
 * @apiError 409 Conflict Error
 * @apiError 500 System Error
 */
const updateUserUsernameRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserUsernameRequest>,
  res: Response,
) => {
  const user = await getUserByUsername(req.body.username);
  if (user) {
    throw new ConflictError('User already exists');
  }
  await updateUserUsername(req.params.uuid, req.body.username);
  return res.status(204).send();
};

export default updateUserUsernameRoute;
