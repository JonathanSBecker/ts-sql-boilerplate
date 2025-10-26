import argon2id from 'argon2';
import { Request, Response } from 'express';

import { LoginRequest } from './request/login';
import { getCredential } from '../../db/credentials';
import { getUserPreferences } from '../../db/user-preferences';
import { getUserByEmail, getUserByUsername } from '../../db/users';
import BadRequestError from '../../error/BadRequestError';
import NotFoundError from '../../error/NotFoundError';
import SystemError from '../../error/SystemError';
import { encodeJWT } from '../../utils/jwt';
import logger from '../../utils/logger';
import { getNewSessionForUserAndDevice } from '../../utils/sessions';

/**
 * @api {POST} /api/access/login Login
 * @apiName Login
 * @apiGroup Access
 *
 * @apiSuccess 200 Object with session JWT and User object populated with user preferences
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 500 System Error
 */
const loginRoute = async (
  req: Request<unknown, unknown, LoginRequest>,
  res: Response,
) => {
  let user = await getUserByEmail(req.body.username);

  if (!user) {
    user = await getUserByUsername(req.body.username);
  }

  if (!user) {
    throw new NotFoundError();
  }

  const credential = await getCredential(user.uuid);
  if (!credential) {
    logger.error(`Invalid credential for user ${user.uuid}`);
    throw new SystemError('Unable to retrieve credential');
  }

  if (await argon2id.verify(credential.hashedPassword, req.body.password)) {
    if (!req.headers.deviceuuid || req.headers.deviceuuid instanceof Array) {
      throw new BadRequestError("Header 'deviceuuid' is required");
    }

    const session = await getNewSessionForUserAndDevice(
      user.uuid,
      req.headers.deviceuuid as string,
    );
    if (!session) {
      throw new SystemError('Unable to create session for user');
    }

    user.preferences = await getUserPreferences(user.uuid);

    const jwt = await encodeJWT(session.uuid);
    return res.status(200).json({ user, jwt });
  } else {
    throw new NotFoundError();
  }
};

export default loginRoute;
