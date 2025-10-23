interface PasswordResetRequest {
  uuid: string;
  userUuid: string;
  expiresAt: Date;
}

export default PasswordResetRequest;
