export default interface UserPreferences {
  userUuid?: string;
  staySignedIn: boolean;
  sessionLength: number;
  termsAndConditionsAccepted: boolean;
  useSmsMfa: boolean;
  useEmailMfa: boolean;
  receiveEmailMarketing: boolean;
  language: string;
  timezone: string;
}
