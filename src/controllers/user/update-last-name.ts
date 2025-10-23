import { Request, Response } from 'express';

import { UpdateUserLastNameRequest } from './request/update-last-name';
import { updateUserLastName } from '../../db/users';

const updateUserLastNameRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserLastNameRequest>,
  res: Response,
) => {
  await updateUserLastName(req.params.uuid, req.body.lastName);
  return res.status(204).send();
};

export default updateUserLastNameRoute;
