import argon2id from 'argon2';
import { Request, Response } from 'express';

import { UpdatePasswordRequest } from './request/update-password';
import { getCredential, updatePassword } from '../../db/credentials';
import ForbiddenError from '../../error/ForbiddenError';
import SystemError from '../../error/SystemError';
import logger from '../../utils/logger';

/**
 * @api {put} /api/v2/access/update-password Update Password
 * @apiGroup Access
 * @apiPermission authenticated user
 *
 * @apiDescription Use this endpoint to update a user's password. The request must include
 * the new password value.
 *
 * @apiParam {String} password The new password.
 *
 * @apiSuccess {String} updatePassword Successful update of password.
 *
 * @apiError NotFoundError The user was not found.
 * @apiError ServerError An error occurred on the server.
 */
const updatePasswordRoute = async (
  req: Request<unknown, unknown, UpdatePasswordRequest>,
  res: Response,
) => {
  const credential = await getCredential(res.locals.context.user.uuid);

  if (!credential) {
    logger.crit('Unable to resolve credential for user');
    throw new SystemError('Unable to retrieve credential for user');
  }

  if (
    !(await argon2id.verify(credential.hashedPassword, req.body.currentPassword))
  ) {
    throw new ForbiddenError();
  }

  await updatePassword(
    res.locals.context.user.uuid,
    await argon2id.hash(req.body.currentPassword),
  );

  return res.status(204).send();
};

export default updatePasswordRoute;
