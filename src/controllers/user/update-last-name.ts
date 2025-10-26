import { Request, Response } from 'express';

import { UpdateUserLastNameRequest } from './request/update-last-name';
import { updateUserLastName } from '../../db/users';

/**
 * @api {put} /api/v2/users/:uuid/name Update User Last Name
 * @apiName UpdateName
 * @apiGroup User
 * @apiDescription This API endpoint updates the user's last name. The user is identified by the ID provided
 * in the request parameters. If the user cannot be found, a NotFoundError is thrown.
 *
 * @apiParam {String} id The unique ID of the user whose name is being updated.
 * @apiParam {String} lastName The new last name for the user.
 *
 * @apiSuccess (204) {None} None No content will be sent back upon success. A status code of 204 will indicate that the
 * operation was successful.
 *
 * @apiError NotFoundError The specified user could not be found.
 */
const updateUserLastNameRoute = async (
  req: Request<{ uuid: string }, unknown, UpdateUserLastNameRequest>,
  res: Response,
) => {
  await updateUserLastName(req.params.uuid, req.body.lastName);
  return res.status(204).send();
};

export default updateUserLastNameRoute;
