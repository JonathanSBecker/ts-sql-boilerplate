import { Request, Response } from 'express';

import { UpdateUserPreferenceReceiveEmailMarketingRequest } from './request/update-preference-receive-email-marketing';
import { updateUserPreferenceReceiveEmailMarketing } from '../../db/user-preferences';

const updateUserPreferenceReceiveEmailMarketingRoute = async (
  req: Request<
    { uuid: string },
    unknown,
    UpdateUserPreferenceReceiveEmailMarketingRequest
  >,
  res: Response,
) => {
  await updateUserPreferenceReceiveEmailMarketing(
    req.params.uuid,
    req.body.receiveEmailMarketing,
  );
  return res.status(204).send();
};

export default updateUserPreferenceReceiveEmailMarketingRoute;
