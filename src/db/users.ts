import { execute, now, query, queryArray } from '../utils/db';
import UserDbo from './types/user-dbo';
import User from '../types/user';

export const convertUserFromDbo = (user: UserDbo) => {
  return {
    uuid: user.uuid,
    username: user.username,
    usernameInternal: user.usernameInternal,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    emailVerifiedAt: user.emailVerifiedAt,
    phoneVerifiedAt: user.phoneVerifiedAt,
    birthday: user.birthday,
    createdAt: user.createdAt,
    isStaff: user.isStaff,
    isDeveloper: user.isDeveloper,
    isActive: user.isActive,
  } as User;
};

export const convertUsersFromDbo = (users: UserDbo[]) =>
  users.map(convertUserFromDbo);

export const getUsers = async (): Promise<User[]> =>
  convertUsersFromDbo(
    await queryArray<UserDbo>({
      sql: 'select * from user',
      params: {},
    }),
  );

export const getActiveUsers = async (): Promise<User[]> =>
  queryArray<UserDbo>({
    sql: `select * from user
          where deletedAt is null
          and isActive = true`,
    params: {},
  });

export const getUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  const user = await query<UserDbo>({
    sql: `select * from user
          where email = :email
          and deletedAt is null
          and isActive = true`,
    params: { email },
  });
  if (!user) return undefined;
  else return convertUserFromDbo(user);
};

export const getUser = async (uuid: string): Promise<User | undefined> => {
  const user = await query<UserDbo>({
    sql: `select * from user
            where uuid = :uuid
            and deletedAt is null`,
    params: { uuid },
  });
  if (!user) return undefined;
  else return convertUserFromDbo(user);
};

export const getUserByUsername = async (
  username: string,
): Promise<User | undefined> => {
  const user = await query<UserDbo>({
    sql: `select * from user
          where username = :username
          and deletedAt is null
          and isActive = true`,
    params: { username },
  });
  if (!user) return undefined;
  else return convertUserFromDbo(user);
};

export const getUserByUsernameInternal = async (
  username: string,
): Promise<User | undefined> => {
  const user = await query<UserDbo>({
    sql: `select * from user
          where usernameInternal = :username`,
    params: { username: username.toLowerCase() },
  });
  if (!user) return undefined;
  else return convertUserFromDbo(user);
};

export const deactivateUser = async (uuid: string) =>
  execute({
    sql: `update user
          set isActive = false
          where uuid = :uuid`,
    params: { uuid },
  });

export const deleteUser = async (uuid: string) =>
  execute({
    sql: `update user
          set deletedAt = :now,
              updatedAt = :now
          where uuid = :uuid`,
    params: { now: now(), uuid },
  });

/** **WARNING**: This is only intended for GDPR requests;
 * due to cascades, all data related to the requested user will be permanently deleted.
 * Do not use unless you are 100% positive the data needs to be completely destroyed. */
export const deleteUserHard = async (uuid: string) =>
  execute({
    sql: `delete from user
          where uuid = :uuid`,
    params: { uuid },
  });

export const updateUserUsername = async (uuid: string, username: string) =>
  execute({
    sql: `update user
          set username  = :username,
              updatedAt = :now
          where uuid = :uuid`,
    params: { username, now: now(), uuid },
  });

export const updateUserFirstName = async (uuid: string, firstName: string) =>
  execute({
    sql: `update user
          set firstName = :firstName,
              updatedAt = :now
          where uuid = :uuid`,
    params: { firstName, now: now(), uuid },
  });

export const updateUserLastName = async (uuid: string, lastName: string) =>
  execute({
    sql: `update user
          set lastname  = :lastName,
              updatedAt = :now
          where uuid = uuid`,
    params: { lastName, now: now(), uuid },
  });

export const updateUserEmail = async (uuid: string, email: string) =>
  execute({
    sql: `update user
          set email           = :email,
              emailVerifiedAt = null,
              updatedAt       = :now
          where uuid = :uuid`,
    params: { email, now: now(), uuid },
  });

export const updateUserPhoneNumber = async (
  uuid: string,
  phoneNumber: string,
) =>
  execute({
    sql: `update user
          set phoneNumber     = :phoneNumber,
              phoneVerifiedAt = null,
              updatedAt       = :now
          where uuid = :uuid`,
    params: { phoneNumber, now: now(), uuid },
  });
