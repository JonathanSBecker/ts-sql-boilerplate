import argon2id from 'argon2';
import { Request, Response } from 'express';

import { ResetPasswordRequest } from './request/reset-password';
import { updatePassword } from '../../db/credentials';
import { deleteResetRequest, getResetRequest } from '../../db/reset-requests';
import { getUser } from '../../db/users';
import ExpiredError from '../../error/ExpiredError';
import NotFoundError from '../../error/NotFoundError';
import SystemError from '../../error/SystemError';
import logger from '../../utils/logger';

/**
 * @api {POST} /api/access/reset-password/:uuid Deactivate User
 * @apiName DeactivateUser
 * @apiGroup Access
 *
 * @apiParam {string} URL Param, UUID for the reset request
 * @apiParam {string} newPassword New Password for user
 *
 * @apiSuccess 205 Empty response status code
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 500 System Error
 */
const passwordResetRoute = async (
  req: Request<{ requestUuid: string }, unknown, ResetPasswordRequest>,
  res: Response,
) => {
  const resetRequest = await getResetRequest(req.params.requestUuid);

  if (!resetRequest) {
    throw new NotFoundError();
  }

  if (resetRequest.expiresAt.getTime() > new Date().getTime()) {
    throw new ExpiredError();
  }

  const user = await getUser(resetRequest.userUuid);

  if (!user) {
    // This is a 500 since theoretically if there's a valid password request but no valid user, there
    // is likely a larger system issue.
    logger.crit(
      `Unable to find user for password reset request ${req.params.requestUuid}`,
    );
    throw new SystemError();
  }

  await updatePassword(user.uuid, await argon2id.hash(req.body.newPassword));

  await deleteResetRequest(req.params.requestUuid);

  return res.status(204).send();
};

export default passwordResetRoute;
