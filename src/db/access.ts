import User from '../types/user';
import UserPreferences from '../types/user-preferences';
import { now, useTransaction } from '../utils/db';

export const addNewUser = async (
  user: User,
  preferences: UserPreferences,
  hashedPassword: string,
) => {
  await useTransaction([
    {
      sql: `
      insert into user(
        uuid,
        username,
        usernameInternal,
        firstName,
        lastName,
        email,
        phoneNumber,
        birthday,
        createdAt,
        updatedAt,
        isActive,
        isStaff,
        isDeveloper
      ) values (
        :uuid,
        :username,
        :usernameInternal,
        :firstName,
        :lastName,
        :email,
        :phoneNumber,
        :birthday,
        :now,
        :now,
        :isActive,
        :isStaff,
        :isDeveloper)`,
      params: {
        uuid: user.uuid,
        username: user.username,
        usernameInternal: user.username.toLowerCase(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        now: now(),
        isActive: true,
        isStaff: false,
        isDeveloper: false,
      },
    },
    {
      sql: `
        insert into credential (
          userUuid,
          hashedPassword,
          createdAt,
          updatedAt
        ) values (
          :uuid,
          :hashedPassword,
          :now,
          :now)`,
      params: {
        uuid: user.uuid,
        hashedPassword,
        now: now(),
      },
    },
    {
      sql: `
      insert into user_preferences (
        userUuid,
        staySignedIn,
        sessionLength,
        termsAndConditionsAccepted,
        useSmsMfa,
        useEmailMfa,
        receiveEmailMarketing,
        language,
        timezone
      ) values (
        :uuid,
        :staySignedIn,
        :sessionLength,
        :termsAndConditionsAccepted,
        :useSmsMfa,
        :useEmailMfa,
        :receiveEmailMarketing,
        :language,
        :timezone)
    `,
      params: {
        uuid: user.uuid,
        ...preferences,
      },
    },
  ]);
};
