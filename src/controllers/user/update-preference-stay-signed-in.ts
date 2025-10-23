import { Request, Response } from 'express';

import { UpdateUserPreferenceStaySignedInRequest } from './request/update-preference-stay-signed-in';
import { updateUserPreferenceStaySignedIn } from '../../db/user-preferences';

const updateUserPreferenceRoute = async (
  req: Request<
    { uuid: string },
    unknown,
    UpdateUserPreferenceStaySignedInRequest
  >,
  res: Response,
) => {
  await updateUserPreferenceStaySignedIn(
    req.params.uuid,
    req.body.staySignedIn,
  );
  return res.status(204).send();
};

export default updateUserPreferenceRoute;
