import { Request, Response } from 'express';

import { RequestPasswordResetRequest } from './request/reset-password-request';
import { addResetRequest } from '../../db/reset-requests';
import { getUserByEmail } from '../../db/users';
import generateUuid from '../../utils/uuid';

/**
 * @api {post} /v2/access/reset-password Request password reset
 * @apiGroup Access
 * @apiName ResetPassword
 *
 * @apiParam {string} email User's email.
 *
 * @apiSuccess {Number} status 204 response code if successful.
 *
 * @apiError UserNotFound The email of the User was not found.
 * @apiError EmailFailure Failed to send password reset email.
 * @apiError BadRequest The request was not properly formed.
 * @apiError ServerError There was a problem with the server.
 *
 * @apiDescription This is an API to request a password reset. An email will be sent to the given email address with
 * further instructions. If the user is not found, the endpoint will still return a 204 status, this is to prevent
 * giving information on which emails are registered in the system.
 */
const requestPasswordResetRoute = async (
  req: Request<unknown, unknown, RequestPasswordResetRequest>,
  res: Response,
) => {
  const user = await getUserByEmail(req.body.email);

  if (!user) {
    // Send the same ack regardless, to obfuscate against attacks
    return res.status(204).send();
  }

  const requestUuid = generateUuid();

  // TODO: Add email integration
  await addResetRequest(requestUuid, user.uuid);

  return res.status(204).send();
};

export default requestPasswordResetRoute;
