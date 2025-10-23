import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import SystemError from '../error/SystemError';

declare module 'jsonwebtoken' {
  export interface SessionJwtPayload extends jwt.JwtPayload {
    sessionUuid: string;
  }
}

const getSecret = (): string => {
  dotenv.config();
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new SystemError('Unable to get JWT_SECRET');
  return secret;
};

async function verifyJWT(token: string) {
  return <jwt.SessionJwtPayload>jwt.verify(token, getSecret());
}

async function encodeJWT(sessionUuid: string) {
  return jwt.sign({ sessionUuid }, getSecret());
}

export { encodeJWT, verifyJWT };
