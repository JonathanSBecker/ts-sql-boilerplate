import UserPreferencesDbo from './types/user-preferences-dbo';
import UserPreferences from '../types/user-preferences';
import { execute, query } from '../utils/db';

export const getUserPreferences = async (userUuid: string) => {
  const preferences = await query<UserPreferencesDbo>({
    sql: `select * from user_preferences
          where userUuid = :userUuid`,
    params: { userUuid },
  });
  return {
    staySignedIn: preferences?.staySignedIn,
    sessionLength: preferences?.sessionLength,
    termsAndConditionsAccepted: preferences?.termsAndConditionsAccepted,
    useSmsMfa: preferences?.useSmsMfa,
    useEmailMfa: preferences?.useEmailMfa,
    receiveEmailMarketing: preferences?.receiveEmailMarketing,
    language: preferences?.language,
  } as UserPreferences;
};

export const updateUserPreferenceStaySignedIn = async (
  userUuid: string,
  staySignedIn: boolean,
) =>
  execute({
    sql: `
    update user_preferences
    set staySignedIn = :staySignedIn
    where userUuid = :userUuid`,
    params: { staySignedIn, userUuid },
  });

export const updateUserPreferenceSessionLength = async (
  userUuid: string,
  sessionLength: number,
) =>
  execute({
    sql: `
    update user_preferences
    set sessionLength = :sessionLength
    where userUuid = :userUuid`,
    params: { sessionLength, userUuid },
  });

export const updateUserPreferenceTermsAndConditionsAccepted = async (
  userUuid: string,
  termsAndConditionsAccepted: boolean,
) =>
  execute({
    sql: `update user_preferences
          set termsAndConditionsAccepted = :termsAndConditionsAccepted
          where userUuid = :userUuid`,
    params: { termsAndConditionsAccepted, userUuid },
  });

export const updateUserPreferenceUseSmsMfa = async (
  userUuid: string,
  useSmsMfa: boolean,
) =>
  execute({
    sql: `update user_preferences
          set useSmsMfa = :useSmsMfa
          where userUuid = :userUuid`,
    params: { useSmsMfa, userUuid },
  });

export const updateUserPreferenceUseEmailMfa = async (
  userUuid: string,
  useEmailMfa: boolean,
) =>
  execute({
    sql: `update user_preferences
          set useEmailMfa = :useEmailMfa
          where userUuid = :userUuid`,
    params: { useEmailMfa, userUuid },
  });

export const updateUserPreferenceReceiveEmailMarketing = async (
  userUuid: string,
  receiveEmailMarketing: boolean,
) =>
  execute({
    sql: `update user_preferences
          set receiveEmailMarketing = :receiveEmailMarketing
          where userUuid = :userUuid`,
    params: { receiveEmailMarketing, userUuid },
  });
