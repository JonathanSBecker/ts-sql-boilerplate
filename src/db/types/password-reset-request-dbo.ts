import { RowDataPacket } from 'mysql2';

import PasswordResetRequest from '../../types/password-reset-request';

export default interface PasswordResetRequestDbo
  extends PasswordResetRequest,
    RowDataPacket {}
