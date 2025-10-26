import { Request, Response } from 'express';

import { UpdateUserPreferenceReceiveEmailMarketingRequest } from './request/update-preference-receive-email-marketing';
import { updateUserPreferenceReceiveEmailMarketing } from '../../db/user-preferences';

/**
 * @api {put} /api/users/:uuid/preferences/receive-email-marketing Update User Preferences Receive Email Marketing
 * @apiName UpdateUserPreferencesReceiveEmailMarketing
 * @apiGroup User
 *
 *
 * @apiParam {Boolean} receiveEmailMarketing User preference for receiving email marketing
 *
 * @apiSuccess (204) {None} No content
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 404 Not Found Error
 * @apiError 500 System Error
 */
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
