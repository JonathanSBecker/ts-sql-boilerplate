import { addDays } from './date-time';
import generateUuid from './uuid';
import {
  createSession,
  deleteSession,
  deleteSessionForDevice,
  deleteSessionsForUser,
  getSession,
} from '../db/sessions';
import { getUser } from '../db/users';
import NotFoundError from '../error/NotFoundError';
import SystemError from '../error/SystemError';
import Session from '../types/session';

/**
 * Returns Session if it exists and valid, returns undefined otherwise.
 * @param uuid
 */
export const getSessionIfValid = async (uuid: string) => {
  const session = await getSession(uuid);
  if (
    !session ||
    (session.expiresAt && session.expiresAt.getTime() < Date.now())
  ) {
    return undefined;
  }
  return session;
};

const generateSessionForUserAndDevice = async (
  userUuid: string,
  deviceUuid: string,
): Promise<Session> => {
  const user = await getUser(userUuid);
  if (!user) throw new NotFoundError();

  let expiresAt: Date | undefined;
  if (user.preferences && !user.preferences.staySignedIn) {
    expiresAt = addDays(new Date(), 1);
  }

  const session = await createSession({
    uuid: generateUuid(),
    userUuid,
    expiresAt,
    deviceUuid,
    lastUsedAt: new Date(),
  });

  if (!session) throw new SystemError('Unable to create user session.');

  return session;
};

/**
 * Invalidates the old session for userUuid + deviceUuid, then returns a new one.
 * @param userUuid
 * @param deviceUuid
 */
export const getNewSessionForUserAndDevice = async (
  userUuid: string,
  deviceUuid: string,
) => {
  await deleteSessionForDevice(deviceUuid);

  return await generateSessionForUserAndDevice(userUuid, deviceUuid);
};

export const invalidateSession = async (uuid: string) => deleteSession(uuid);

export const invalidateSessionsForUser = async (userUuid: string) =>
  deleteSessionsForUser(userUuid);
