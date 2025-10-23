import { RowDataPacket } from 'mysql2';

import Credential from '../../types/credential';

export default interface CredentialDbo extends Credential, RowDataPacket {}
