import { execute, now, query } from '../utils/db';
import CredentialDbo from './types/credential-dbo';

export const getCredential = async (userUuid: string) =>
  query<CredentialDbo>({
    sql: `
      select * from credential
      where userUuid = :userUuid`,
    params: { userUuid },
  });

export const updatePassword = async (
  userUuid: string,
  hashedPassword: string,
) =>
  execute({
    sql: `
      update credential
      set hashedPassword = :hashedPassword,
          updatedAt      = :now
      where userUuid = :userUuid`,
    params: { hashedPassword, now: now(), userUuid },
  });

export const addCredential = async (userUuid: string, hashedPassword: string) =>
  execute({
    sql: `
        insert into credential (
          userUuid,
          hashedPassword,
          createdAt,
          updatedAt
        ) values (
          :userUuid,
          :hashedPassword,
          :now,
          :now)`,
    params: { userUuid, hashedPassword, now: now() },
  });
