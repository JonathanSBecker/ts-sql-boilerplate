import { RowDataPacket } from 'mysql2';

import UserPreferences from '../../types/user-preferences';

export default interface UserPreferencesDbo
  extends UserPreferences,
    RowDataPacket {}
