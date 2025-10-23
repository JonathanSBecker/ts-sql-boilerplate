import { Request, Response } from 'express';

import { deleteUserHard } from '../../db/users';
import logger from '../../utils/logger';

/** WARNING: THIS IS INTENDED ONLY FOR GDPR REQUESTS,
 * THIS WILL COMPLETELY DELETE ALL DATA RELATED TO THIS USER FROM THE DB */
const deleteUserHardRoute = async (
  req: Request<{ uuid: string }, unknown, unknown>,
  res: Response,
) => {
  logger.warn(`Hard deletion requested for user ${req.params.uuid}`);
  await deleteUserHard(req.params.uuid);

  return res.status(205).send();
};

export default deleteUserHardRoute;
