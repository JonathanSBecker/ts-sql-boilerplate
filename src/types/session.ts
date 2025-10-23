export default interface Session {
  uuid: string;
  userUuid: string;
  deviceUuid: string;
  lastUsedAt: Date;
  expiresAt?: Date;
}
