import { execute, now, query } from '../utils/db';
import SessionDbo from './types/session-dbo';
import SystemError from '../error/SystemError';
import Session from '../types/session';

export const getSession = async (uuid: string) =>
  query<SessionDbo>({
    sql: `select * from session
          where uuid = :uuid`,
    params: { uuid },
  });

export const getSessionForUserAndDevice = async (
  userUuid: string,
  deviceUuid: string,
) =>
  query<SessionDbo>({
    sql: `select * from session
          where userUuid = :userUuid
          and deviceUuid = :deviceUuid`,
    params: { userUuid, deviceUuid },
  });

export const createSession = async (session: Session) => {
  await execute({
    sql: `insert into session (
            uuid,
            userUuid,
            deviceUuid,
            lastUsedAt,
            createdAt,
            expiresAt
          ) values (
            :uuid,
            :userUuid,
            :deviceUuid,
            :now,
            :now,
            :expiresAt)`,
    params: {
      uuid: session.uuid,
      userUuid: session.userUuid,
      deviceUuid: session.deviceUuid,
      now: now(),
      expiresAt: session.expiresAt,
    },
  });
  const createdSession = await getSession(session.uuid);
  if (!createdSession) throw new SystemError('Unable to create session.');
  return createdSession;
};

export const deleteSessionForDevice = async (deviceUuid: string) =>
  execute({
    sql: `delete from session
          where deviceUuid = :deviceUuid`,
    params: { deviceUuid },
  });

export const deleteSession = async (uuid: string) =>
  execute({
    sql: `delete from session
          where uuid = :uuid`,
    params: { uuid },
  });

export const deleteSessionsForUser = async (userUuid: string) =>
  execute({
    sql: `delete from session
          where userUuid = :userUuid`,
    params: { userUuid },
  });
