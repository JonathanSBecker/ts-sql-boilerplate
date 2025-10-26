import { Request, Response } from 'express';

import { UpdateUserPreferenceSessionLengthRequest } from './request/update-preference-session-length';
import { updateUserPreferenceSessionLength } from '../../db/user-preferences';

/**
 * @api {put} /api/users/:uuid/preferences/receive-email-marketing Update User Preferences Session Length
 * @apiName UpdateUserPreferencesSessionLength
 * @apiGroup User
 *
 * @apiParam {Number} Number of hours a user session will stay valid
 *
 * @apiSuccess (204) {None} No content
 *
 * @apiError 400 Bad Request Error
 * @apiError 401 Unauthorized Error
 * @apiError 404 Not Found Error
 * @apiError 500 System Error
 */
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
