import { RowDataPacket } from 'mysql2';

import User from '../../types/user';

export default interface UserDbo extends User, RowDataPacket {}
