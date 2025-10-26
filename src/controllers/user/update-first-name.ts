import { Request, Response } from 'express';

import { UpdateUserFirstNameRequest } from './request/update-first-name';
import { updateUserFirstName } from '../../db/users';

/**
 * @api {put} /api/v2/users/:uuid/name Update User First Name
 * @apiName UpdateName
 * @apiGroup User
 * @apiDescription This API endpoint updates the user's first name. The user is identified by the ID provided
 * in the request parameters. If the user cannot be found, a NotFoundError is thrown.
 *
 * @apiParam {String} id The unique ID of the user whose name is being updated.
 * @apiParam {String} firstName The new first name for the user.
 *
 * @apiSuccess (204) {None} None No content will be sent back upon success. A status code of 204 will indicate that the
 * operation was successful.
 *
 * @apiError NotFoundError The specified user could not be found.
 */
const updateUserFirstNameRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserFirstNameRequest>,
  res: Response,
) => {
  await updateUserFirstName(req.params.uuid, req.body.firstName);
  return res.status(204).send();
};

export default updateUserFirstNameRoute;
