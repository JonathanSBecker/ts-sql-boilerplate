import { Request, Response } from 'express';

import { UpdateUserPhoneNumberRequest } from './request/update-phone-number';
import { updateUserPhoneNumber } from '../../db/users';

const updateUserPhoneNumberRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserPhoneNumberRequest>,
  res: Response,
) => {
  await updateUserPhoneNumber(req.params.uuid, req.body.phoneNumber);
  return res.status(204).send();
};

export default updateUserPhoneNumberRoute;
