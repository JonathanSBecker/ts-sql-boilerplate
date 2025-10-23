import { Request, Response } from 'express';

import { UpdateUserPreferenceTermsAndConditionsAcceptedRequest } from './request/update-preference-terms-and-conditions-accepted';
import { updateUserPreferenceTermsAndConditionsAccepted } from '../../db/user-preferences';

const updateUserPreferenceTermsAndConditionsAcceptedRoute = async (
  req: Request<
    { uuid: string },
    unknown,
    UpdateUserPreferenceTermsAndConditionsAcceptedRequest
  >,
  res: Response,
) => {
  await updateUserPreferenceTermsAndConditionsAccepted(
    req.params.uuid,
    req.body.termsAndConditionsAccepted,
  );
  return res.status(204).send();
};

export default updateUserPreferenceTermsAndConditionsAcceptedRoute;
