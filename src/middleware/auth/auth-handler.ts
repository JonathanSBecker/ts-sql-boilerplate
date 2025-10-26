import { NextFunction, Request, Response } from 'express';

import { getUser } from '../../db/users';
import BadRequestError from '../../error/BadRequestError';
import ForbiddenError from '../../error/ForbiddenError';
import UnauthorizedError from '../../error/UnauthorizedError';
import { verifyJWT } from '../../utils/jwt';
import { getSessionIfValid, invalidateSession } from '../../utils/sessions';
import { getUserPreferences } from '../../db/user-preferences';
import SystemError from '../../error/SystemError';

const handleAuth = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization || '';
  if (!authorization) {
    throw new UnauthorizedError();
  }

  const token = authorization.replace('Bearer ', '').trim();
  if (!token) {
    throw new UnauthorizedError();
  }

  const deviceUuid = req.headers.deviceuuid;
  if (!deviceUuid || deviceUuid instanceof Array) {
    throw new BadRequestError("Header 'deviceuuid' is required");
  }

  const utcOffset = req.headers.utcoffset;
  if (!utcOffset || utcOffset instanceof Array) {
    throw new BadRequestError("Header 'utcoffset' is required");
  }

  const tokenObject = await verifyJWT(token);
  const session = await getSessionIfValid(tokenObject.sessionUuid);
  if (!session) {
    throw new UnauthorizedError();
  }

  if (session.deviceUuid !== (req.headers.deviceuuid as string)) {
    await invalidateSession(session.uuid);
    throw new ForbiddenError(
      'The deviceUuid does not match deviceUuid associated with session.',
    );
  }

  if (session.expiresAt && session.expiresAt < new Date()) {
    await invalidateSession(session.uuid);
    throw new UnauthorizedError();
  }

  const user = await getUser(session.userUuid);

  if (!user) {
    throw new UnauthorizedError();
  }

  user.preferences = await getUserPreferences(user?.uuid);

  if (!user.preferences) {
    throw new SystemError('Unable to retrieve internal user data');
  }

  if (!user.isActive) {
    throw new UnauthorizedError('Account deactivated.');
  }

  res.locals.context = {
    user,
    session,
    utcOffset,
    ...res.locals.context,
  };

  return user;
};

const standardAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await handleAuth(req, res);
  return next();
};

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const user = await handleAuth(req, res);
  if (!user.isStaff && !user.isDeveloper) {
    throw new ForbiddenError();
  }
  return next();
};

const developerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await handleAuth(req, res);
  if (!user.isDeveloper) {
    throw new ForbiddenError();
  }
  return next();
};

export { adminAuth, developerAuth, standardAuth };
