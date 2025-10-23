import { Request, Response } from 'express';

import { UpdateUserPreferenceSessionLengthRequest } from './request/update-preference-session-length';
import { updateUserPreferenceSessionLength } from '../../db/user-preferences';

const updateUserPreferenceSessionLengthRoute = async (
  req: Request<
    { uuid: string },
    unknown,
    UpdateUserPreferenceSessionLengthRequest
  >,
  res: Response,
) => {
  await updateUserPreferenceSessionLength(
    req.params.uuid,
    req.body.sessionLength,
  );
  return res.status(204).send();
};

export default updateUserPreferenceSessionLengthRoute;
