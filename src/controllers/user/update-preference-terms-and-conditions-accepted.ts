import { Request, Response } from 'express';

import { UpdateUserPreferenceTermsAndConditionsAcceptedRequest } from './request/update-preference-terms-and-conditions-accepted';
import { updateUserPreferenceTermsAndConditionsAccepted } from '../../db/user-preferences';

/**
 * @api {put} /api/users/:uuid/preferences/receive-email-marketing Update User Preferences Terms and Conditions Accepted
 * @apiName UpdateUserPreferencesTermsAndConditionsAccepted
 * @apiGroup User
 *
 * @apiParam {Boolean} receiveEmailMarketing User setting for whether T&C has been accepted
 *
 * @apiSuccess (204) {None} No content
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 404 Not Found Error
 * @apiError 500 System Error
 */
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
