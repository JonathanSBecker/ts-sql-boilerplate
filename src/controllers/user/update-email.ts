import { Request, Response } from 'express';

import { UpdateUserEmailRequest } from './request/update-email';
import { getUserByEmail, updateUserEmail } from '../../db/users';
import ConflictError from '../../error/ConflictError';

const updateUserEmailRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserEmailRequest>,
  res: Response,
) => {
  const user = await getUserByEmail(req.body.email);
  if (user) {
    throw new ConflictError('User already exists');
  }
  await updateUserEmail(req.params.uuid, req.body.email);
  return res.status(204).send();
};

export default updateUserEmailRoute;
