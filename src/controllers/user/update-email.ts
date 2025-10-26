import { Request, Response } from 'express';

import { UpdateUserEmailRequest } from './request/update-email';
import { getUserByEmail, updateUserEmail } from '../../db/users';
import ConflictError from '../../error/ConflictError';

/**
 * @api {put} /api/v2/users/:uuid/email Update User's Email
 * @apiName UpdateUserEmail
 * @apiGroup User
 * @apiDescription This API endpoint updates the user's email. The user is identified by the ID provided in the request
 * parameters. If the user cannot be found, a NotFoundError is thrown. It will send an Email Verification Code to the
 * new email.
 *
 * @apiParam {String} id The unique ID of the user whose email is being updated.
 * @apiParam {String} email The new email for the user.
 *
 * @apiSuccess (204) {None} None No content will be sent back upon success. A status code of 204 will indicate that the
 * operation was successful.
 *
 * @apiError NotFoundError The specified user could not be found.
 */
const updateUserEmailRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserEmailRequest>,
  res: Response,
) => {
  const user = await getUserByEmail(req.body.email);
  if (user) {
    throw new ConflictError('User already exists');
  }
  await updateUserEmail(req.params.uuid, req.body.email);
  return res.status(204).send();
};

export default updateUserEmailRoute;
