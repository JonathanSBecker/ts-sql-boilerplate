import UserPreferences from './user-preferences';

export default interface User {
  uuid: string;
  username: string;
  usernameInternal: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt?: number;
  phoneNumber: string;
  phoneVerifiedAt?: number;
  birthday: string;
  createdAt?: Date;
  isActive: boolean;
  isStaff: boolean;
  isDeveloper: boolean;
  preferences?: UserPreferences;
}
