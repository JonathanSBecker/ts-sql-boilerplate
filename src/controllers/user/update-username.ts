import { Request, Response } from 'express';

import { UpdateUserUsernameRequest } from './request/update-username';
import { getUserByUsername, updateUserUsername } from '../../db/users';
import ConflictError from '../../error/ConflictError';

const updateUserUsernameRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserUsernameRequest>,
  res: Response,
) => {
  const user = await getUserByUsername(req.body.username);
  if (user) {
    throw new ConflictError('User already exists');
  }
  await updateUserUsername(req.params.uuid, req.body.username);
  return res.status(204).send();
};

export default updateUserUsernameRoute;
