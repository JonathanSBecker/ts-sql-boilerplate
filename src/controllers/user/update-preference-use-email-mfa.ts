import { Request, Response } from 'express';

import { UpdateUserPreferenceUseEmailMfaRequest } from './request/update-preference-use-email-mfa';
import { updateUserPreferenceUseEmailMfa } from '../../db/user-preferences';
import BadRequestError from '../../error/BadRequestError';

/**
 * @api {put} /api/users/:uuid/preferences/receive-email-marketing Update User Preferences Use Email MFA
 * @apiName UpdateUserPreferencesReceiveEmailMarketing
 * @apiGroup User
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
const updateUserPreferenceUseEmailMfaRoute = async (
  req: Request<
    { uuid: string },
    unknown,
    UpdateUserPreferenceUseEmailMfaRequest
  >,
  res: Response,
) => {
  if (res.locals.context.user.emailVerifiedAt) {
    await updateUserPreferenceUseEmailMfa(req.params.uuid, req.body.useEmailMfa);
    return res.status(204).send();
  } else {
    throw new BadRequestError('User must have verified email');
  }
};

export default updateUserPreferenceUseEmailMfaRoute;
