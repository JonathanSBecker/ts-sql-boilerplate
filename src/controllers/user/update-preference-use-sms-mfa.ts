import { Request, Response } from 'express';

import { UpdateUserPreferenceUseSmsMfaRequest } from './request/update-preference-use-sms-mfa';
import { updateUserPreferenceUseSmsMfa } from '../../db/user-preferences';
import User from '../../types/user';
import BadRequestError from '../../error/BadRequestError';

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
const updateUserPreferenceUseSmsMfaRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserPreferenceUseSmsMfaRequest>,
  res: Response,
) => {
  const user: User = res.locals.context.user;
  if (user.phoneNumber && user.phoneVerifiedAt) {
    await updateUserPreferenceUseSmsMfa(req.params.uuid, req.body.useSmsMfa);
    return res.status(204).send();
  } else {
    throw new BadRequestError('User must have a phone number set, and the number must be verified.');
  }
};

export default updateUserPreferenceUseSmsMfaRoute;
