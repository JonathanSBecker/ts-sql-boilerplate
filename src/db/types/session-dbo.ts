import { RowDataPacket } from 'mysql2';

import Session from '../../types/session';

export default interface SessionDbo extends Session, RowDataPacket {}
