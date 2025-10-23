import argon2 from 'argon2';
import { Request, Response } from 'express';

import { UpdatePasswordRequest } from './request/update-password';
import { getCredential, updatePassword } from '../../db/credentials';
import ForbiddenError from '../../error/ForbiddenError';
import SystemError from '../../error/SystemError';
import logger from '../../utils/logger';

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
    !(await argon2.verify(credential.hashedPassword, req.body.currentPassword))
  ) {
    throw new ForbiddenError();
  }

  await updatePassword(
    res.locals.context.user.uuid,
    await argon2.hash(req.body.currentPassword),
  );

  return res.status(204).send();
};

export default updatePasswordRoute;
