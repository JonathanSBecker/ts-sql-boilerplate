import { Request, Response } from 'express';

import { UpdateUserPhoneNumberRequest } from './request/update-phone-number';
import { updateUserPhoneNumber } from '../../db/users';

/**
 * @api {put} /api/v2/users/:uuid/phone Update User's Phone Number
 * @apiName UpdatePhoneNumber
 * @apiGroup User
 * @apiDescription This API endpoint updates the user's phone number. The user is identified by the ID provided in the
 * request parameters. If the user cannot be found, a NotFoundError is thrown. If the phone number is invalid, a
 * BadRequestError is thrown.
 *
 * @apiParam {String} id The unique ID of the user whose phone number is being updated.
 * @apiParam {String} phoneNumber The new phone number for the user.
 *
 * @apiSuccess (204) {None} None No content will be sent back upon success. A status code of 204 will indicate that
 * the operation was successful.
 *
 * @apiError NotFoundError The specified user could not be found.
 * @apiError BadRequestError The provided phone number is invalid.
 */
const updateUserPhoneNumberRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserPhoneNumberRequest>,
  res: Response,
) => {
  await updateUserPhoneNumber(req.params.uuid, req.body.phoneNumber);
  return res.status(204).send();
};

export default updateUserPhoneNumberRoute;
