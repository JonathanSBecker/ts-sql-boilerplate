import { Request, Response } from 'express';

import { UpdateUserFirstNameRequest } from './request/update-first-name';
import { updateUserFirstName } from '../../db/users';

const updateUserFirstNameRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserFirstNameRequest>,
  res: Response,
) => {
  await updateUserFirstName(req.params.uuid, req.body.firstName);
  return res.status(204).send();
};

export default updateUserFirstNameRoute;
