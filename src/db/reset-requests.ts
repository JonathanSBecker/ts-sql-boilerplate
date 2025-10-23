import { execute, query } from '../utils/db';
import PasswordResetRequestDbo from './types/password-reset-request-dbo';
import { addMinutes } from '../utils/date-time';

export const addResetRequest = async (uuid: string, userUuid: string) =>
  execute({
    sql: `insert into password_reset_request (
            uuid,
            userUuid,
            expiresAt
          ) values (
            :uuid,
            :userUuid,
            :expiresAt)`,
    params: { uuid, userUuid, expiresAt: addMinutes(new Date(), 10) },
  });

export const getResetRequest = async (uuid: string) =>
  query<PasswordResetRequestDbo>({
    sql: `select * from password_reset_request
          where uuid = :uuid`,
    params: { uuid },
  });

export const deleteResetRequest = async (uuid: string) =>
  execute({
    sql: `delete from password_reset_request
          where uuid = :uuid`,
    params: { uuid },
  });
