import { Request, Response } from 'express';

import { UpdateUserPreferenceStaySignedInRequest } from './request/update-preference-stay-signed-in';
import { updateUserPreferenceStaySignedIn } from '../../db/user-preferences';

/**
 * @api {put} /api/users/:uuid/preferences/receive-email-marketing Update User Preferences Stay Signed In
 * @apiName UpdateUserPreferencesStaySignedIn
 * @apiGroup User
 * @apiDescription Sets whether a user's session will expire or not.
 *
 * @apiParam {Boolean} staySignedIn
 *
 * @apiSuccess (204) {None} No content
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 404 Not Found Error
 * @apiError 500 System Error
 */
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
