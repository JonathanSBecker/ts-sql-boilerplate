import { Request, Response } from 'express';

import { UpdateUserPreferenceUseEmailMfaRequest } from './request/update-preference-use-email-mfa';
import { updateUserPreferenceUseEmailMfa } from '../../db/user-preferences';

const updateUserPreferenceUseEmailMfaRoute = async (
  req: Request<
    { uuid: string },
    unknown,
    UpdateUserPreferenceUseEmailMfaRequest
  >,
  res: Response,
) => {
  await updateUserPreferenceUseEmailMfa(req.params.uuid, req.body.useEmailMfa);
  return res.status(204).send();
};

export default updateUserPreferenceUseEmailMfaRoute;
