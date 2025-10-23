import { Request, Response } from 'express';

import { UpdateUserPreferenceUseSmsMfaRequest } from './request/update-preference-use-sms-mfa';
import { updateUserPreferenceUseSmsMfa } from '../../db/user-preferences';

const updateUserPreferenceUseSmsMfaRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserPreferenceUseSmsMfaRequest>,
  res: Response,
) => {
  await updateUserPreferenceUseSmsMfa(req.params.uuid, req.body.useSmsMfa);
  return res.status(204).send();
};

export default updateUserPreferenceUseSmsMfaRoute;
